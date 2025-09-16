import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Hero } from '../components/Hero'
import { Sections } from '../components/Sections'

export const dynamic = 'force-dynamic'

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

  const result = await payload.find({
    collection: 'pages',
    draft: true,
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const doc = result?.docs?.[0]
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
