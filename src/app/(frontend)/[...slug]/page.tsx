import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Hero } from '../components/Hero'
import { Sections } from '../components/Sections'

// export const dynamic = 'force-dynamic' // Supprimé pour permettre le cache statique

type Params = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: Params) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const resolvedParams = await params
  const pathSegments = resolvedParams?.slug || []
  const slug = pathSegments.join('/') || ''

  const getPageBySlug = unstable_cache(
    async () => {
      const res = await payload.find({
        collection: 'pages',
        draft: process.env.NODE_ENV === 'development', // Draft seulement en dev
        depth: 1,
        limit: 1,
        where: { slug: { equals: slug } },
      })
      return res?.docs?.[0]
    },
    ['page', slug || '', process.env.NODE_ENV || 'production'],
    {
      tags: ['pages', `page:${slug || ''}`],
      revalidate: 3600, // Cache 1 heure
    },
  )

  const doc = await getPageBySlug()
  if (!doc) return notFound()

  return (
    <>
      {/* Hero */}
      <Hero hero={doc.hero as any} />
      {/* Sections */}
      <Sections sections={doc.sections as any} />
    </>
  )
}
