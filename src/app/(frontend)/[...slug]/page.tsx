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
      {/* @ts-expect-error - hero added dynamically via blocks */}
      <Hero hero={doc.hero as any} />
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>{doc.title}</h1>
        {/* Simple render of richText content as JSON for now */}
        {doc.content && (
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(doc.content, null, 2)}</pre>
        )}
      </div>
      {/* Sections */}
      {/* @ts-expect-error - sections is a blocks field added dynamically */}
      <Sections sections={doc.sections as any} />
    </>
  )
}
