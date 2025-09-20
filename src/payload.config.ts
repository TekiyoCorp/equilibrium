import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { FooterGlobal } from './blocks/Footer'
import { HeaderGlobal } from './blocks/Header'

// Hook de revalidation pour Next.js
const revalidateHook = async (args: { doc: any; req: any; operation: string }) => {
  const { doc, operation } = args
  
  // Éviter la revalidation en développement local
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping revalidation in development')
    return
  }

  const revalidateSecret = process.env.REVALIDATE_SECRET
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
  
  if (!revalidateSecret || !siteUrl) {
    console.warn('Revalidation skipped: missing REVALIDATE_SECRET or SITE_URL')
    return
  }

  try {
    const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
    const revalidateUrl = `${baseUrl}/api/revalidate`
    
    console.log(`Triggering revalidation for ${doc.slug || doc.id} (${operation})`)
    
    const response = await fetch(revalidateUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${revalidateSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: args.req.collection?.config?.slug,
        slug: doc.slug,
        operation,
        timestamp: new Date().toISOString()
      })
    })

    if (response.ok) {
      const result = await response.json()
      console.log('Revalidation successful:', result)
    } else {
      console.error('Revalidation failed:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Revalidation error:', error)
  }
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [
    {
      ...HeaderGlobal,
      hooks: {
        afterChange: [
          async ({ doc, operation }) => {
            // Éviter la revalidation en développement
            if (process.env.NODE_ENV === 'development') {
              return doc
            }

            const revalidateSecret = process.env.REVALIDATE_SECRET
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
            
            if (!revalidateSecret || !siteUrl) {
              console.warn('Header revalidation skipped: missing environment variables')
              return doc
            }

            try {
              const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
              const revalidateUrl = `${baseUrl}/api/revalidate`
              
              console.log(`Triggering header revalidation (${operation})`)
              
              const response = await fetch(revalidateUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${revalidateSecret}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tag: 'header',
                  operation,
                  timestamp: new Date().toISOString()
                })
              })

              if (response.ok) {
                const result = await response.json()
                console.log('Header revalidation successful:', result)
              } else {
                console.error('Header revalidation failed:', response.status, response.statusText)
              }
            } catch (error) {
              console.error('Header revalidation error:', error)
            }

            return doc
          }
        ]
      }
    },
    {
      ...FooterGlobal,
      hooks: {
        afterChange: [
          async ({ doc, operation }) => {
            // Éviter la revalidation en développement
            if (process.env.NODE_ENV === 'development') {
              return doc
            }

            const revalidateSecret = process.env.REVALIDATE_SECRET
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
            
            if (!revalidateSecret || !siteUrl) {
              console.warn('Footer revalidation skipped: missing environment variables')
              return doc
            }

            try {
              const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
              const revalidateUrl = `${baseUrl}/api/revalidate`
              
              console.log(`Triggering footer revalidation (${operation})`)
              
              const response = await fetch(revalidateUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${revalidateSecret}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tag: 'footer',
                  operation,
                  timestamp: new Date().toISOString()
                })
              })

              if (response.ok) {
                const result = await response.json()
                console.log('Footer revalidation successful:', result)
              } else {
                console.error('Footer revalidation failed:', response.status, response.statusText)
              }
            } catch (error) {
              console.error('Footer revalidation error:', error)
            }

            return doc
          }
        ]
      }
    }
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production', // Only enable in production
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true, // Enable client uploads to bypass Vercel's 4.5MB limit
    }),
  ],
})
