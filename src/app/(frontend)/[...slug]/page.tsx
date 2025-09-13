import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Hero } from '../components/Hero'
import { MediaCardSlider } from '../components/MediaCardSlider'

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
    <main>
      {/* Hero */}
      {/* @ts-expect-error - hero added dynamically via blocks */}
      <Hero hero={doc.hero as any} />
      <h1>{doc.title}</h1>
      {/* Simple render of richText content as JSON for now */}
      {doc.content && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(doc.content, null, 2)}</pre>
      )}
      {/* Sections */}
      {/* @ts-expect-error - sections is a blocks field added dynamically */}
      {Array.isArray(doc.sections) && doc.sections.map((block: any, i: number) => {
        if (block.blockType === 'mediaCardSlider') {
          return <MediaCardSlider key={i} items={block.items || []} />
        }
        return null
      })}
    </main>
  )
}
