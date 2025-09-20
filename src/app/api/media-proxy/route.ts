import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 })
  }

  try {
    // Essayer de récupérer l'image depuis l'URL Payload
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Equilibrium-MediaProxy/1.0)',
      },
    })

    if (!response.ok) {
      console.error(`Media proxy failed for ${url}: ${response.status} ${response.statusText}`)
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache 24h
        'X-Media-Proxy': 'true',
      },
    })
  } catch (error) {
    console.error('Media proxy error:', error)
    return NextResponse.json({ error: 'Media proxy failed' }, { status: 500 })
  }
}
