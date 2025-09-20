import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Vérification du header Authorization
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.REVALIDATE_SECRET}`
    
    if (!authHeader || authHeader !== expectedAuth) {
      console.error('Unauthorized revalidation attempt:', authHeader)
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    // Récupération des données de revalidation
    const body = await request.json()
    const { path, tag, collection, slug } = body

    console.log('Revalidation request:', { path, tag, collection, slug })

    // Revalidation par path spécifique
    if (path) {
      await revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
      return NextResponse.json({ 
        revalidated: true, 
        path,
        timestamp: new Date().toISOString()
      })
    }

    // Revalidation par tag
    if (tag) {
      await revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
      return NextResponse.json({ 
        revalidated: true, 
        tag,
        timestamp: new Date().toISOString()
      })
    }

    // Revalidation intelligente basée sur la collection
    if (collection && slug) {
      let pathsToRevalidate: string[] = []

      switch (collection) {
        case 'pages':
          // Revalider la page spécifique
          pathsToRevalidate = [
            slug === 'home' ? '/' : `/${slug}`,
            '/' // Revalider aussi la home si c'est une page importante
          ]
          break
          
        case 'media':
          // Revalider toutes les pages car les médias peuvent être partout
          pathsToRevalidate = [
            '/',
            '/contact',
            '/about'
          ]
          await revalidateTag('media')
          break
          
        default:
          // Revalidation générale
          pathsToRevalidate = ['/']
          break
      }

      // Revalider tous les chemins identifiés
      for (const pathToRevalidate of pathsToRevalidate) {
        await revalidatePath(pathToRevalidate)
        console.log(`Revalidated path: ${pathToRevalidate}`)
      }

      return NextResponse.json({ 
        revalidated: true, 
        paths: pathsToRevalidate,
        collection,
        slug,
        timestamp: new Date().toISOString()
      })
    }

    // Si aucun paramètre valide, revalider la home
    await revalidatePath('/')
    console.log('Default revalidation: /')
    
    return NextResponse.json({ 
      revalidated: true, 
      path: '/',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

// Support GET pour tester l'endpoint
export async function GET() {
  return NextResponse.json({ 
    message: 'Revalidation endpoint is working',
    timestamp: new Date().toISOString(),
    usage: {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_REVALIDATE_SECRET'
      },
      body: {
        path: '/path-to-revalidate',
        // OR
        tag: 'tag-to-revalidate', 
        // OR
        collection: 'pages',
        slug: 'page-slug'
      }
    }
  })
}
