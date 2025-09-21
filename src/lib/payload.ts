import { getPayload } from 'payload'
import config from '@/payload.config'

let payloadInstance: unknown = null

export async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

// Helper pour les requêtes optimisées
export async function getPageBySlug(slug: string) {
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'pages',
    draft: process.env.NODE_ENV === 'development',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] || null
}

export async function getHomePage() {
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'pages',
    draft: process.env.NODE_ENV === 'development',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  return result.docs[0] || null
}
