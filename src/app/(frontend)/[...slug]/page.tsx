import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'

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
      <h1>{doc.title}</h1>
      {/* Simple render of richText content as JSON for now */}
      {doc.content && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(doc.content, null, 2)}</pre>
      )}
    </main>
  )
}
