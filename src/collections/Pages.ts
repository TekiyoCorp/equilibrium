import type { CollectionConfig } from 'payload'
import { CenterHero } from '../blocks/Hero/CenterHero'
import { RightHero } from '../blocks/Hero/RightHero'
import { ContactHero } from '../blocks/Hero/ContactHero'
import { MediaCardSlider } from '../blocks/MediaCardSlider'
import { CourseCards } from '../blocks/CourseCards'
import { OverlayFeatureSection } from '../blocks/OverlayFeatureSection'
import { TextMediaTiles } from '../blocks/TextMediaTiles'
import { ConceptSection } from '../blocks/ConceptSection'
import { FaqSection } from '../blocks/FaqSection'
import { Button } from '../blocks/Button'
import { DetailedCourseGrid } from '../blocks/DetailedCourseGrid'
import { CoachesGrid } from '../blocks/CoachesGrid'
import { NewConceptSection } from '../blocks/NewConceptSection'
import { TextImageBlock } from '../blocks/TextImageBlock'
import { Location } from '../blocks/Location'
import { ChatSection } from '../blocks/ChatSection'
import { ConceptIconsSection } from '../blocks/ConceptIconsSection'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    preview: ({ slug }) => `/${slug || ''}`,
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req: _req }) => {
        // Éviter la revalidation en développement
        if (process.env.NODE_ENV === 'development' && process.env.REVALIDATE_ENABLE !== 'true') {
          return doc
        }

        const revalidateSecret = process.env.REVALIDATE_SECRET
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL

        if (!revalidateSecret || !siteUrl) {
          console.warn('Revalidation skipped: missing environment variables')
          return doc
        }

        try {
          const baseUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`
          const revalidateUrl = `${baseUrl}/api/revalidate`

          console.log(`Triggering page revalidation for ${doc.slug} (${operation})`)

          const response = await fetch(revalidateUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${revalidateSecret}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              collection: 'pages',
              slug: doc.slug,
              operation,
              path: doc.slug === 'home' ? '/' : `/${doc.slug}`,
              tags: ['pages', `page:${doc.slug}`],
              timestamp: new Date().toISOString(),
            }),
          })

          if (response.ok) {
            const result = await response.json()
            console.log('Page revalidation successful:', result)
          } else {
            console.error('Page revalidation failed:', response.status, response.statusText)
          }
        } catch (error) {
          console.error('Page revalidation error:', error)
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'hero',
      label: 'Hero',
      type: 'blocks',
      maxRows: 1,
      blocks: [CenterHero, RightHero, ContactHero],
    },
    {
      name: 'sections',
      label: 'Sections',
      type: 'blocks',
      blocks: [
        MediaCardSlider,
        CourseCards,
        DetailedCourseGrid,
        OverlayFeatureSection,
        TextMediaTiles,
        TextImageBlock,
        ConceptSection,
        NewConceptSection,
        FaqSection,
        CoachesGrid,
        Location,
        ChatSection,
        ConceptIconsSection,
        Button,
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
