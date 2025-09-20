import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
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
          console.warn('Media revalidation skipped: missing environment variables')
          return doc
        }

        try {
          const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
          const revalidateUrl = `${baseUrl}/api/revalidate`
          
          console.log(`Triggering media revalidation for ${doc.filename} (${operation})`)
          
          const response = await fetch(revalidateUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${revalidateSecret}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              collection: 'media',
              slug: doc.filename,
              operation,
              tag: 'media', // Utilise un tag pour revalider toutes les pages avec médias
              timestamp: new Date().toISOString()
            })
          })

          if (response.ok) {
            const result = await response.json()
            console.log('Media revalidation successful:', result)
          } else {
            console.error('Media revalidation failed:', response.status, response.statusText)
          }
        } catch (error) {
          console.error('Media revalidation error:', error)
        }

        return doc
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
