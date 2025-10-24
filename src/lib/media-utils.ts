/**
 * Utility functions for handling media URLs
 */

const PRODUCTION_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL

/**
 * Transforms a media URL to use the correct domain
 * Handles both localhost URLs and relative URLs
 */
export function transformMediaUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined

  // Always use production URL for media (Vercel Blob or production server)
  const baseUrl = PRODUCTION_BASE_URL && PRODUCTION_BASE_URL.startsWith('http')
    ? PRODUCTION_BASE_URL
    : PRODUCTION_BASE_URL
      ? `https://${PRODUCTION_BASE_URL}`
      : 'https://equilibrium-weld.vercel.app'

  // If it's already a full URL with the correct domain, return as is
  if (url.startsWith('https://equilibrium-weld.vercel.app')) {
    return url
  }

  if (baseUrl && url.startsWith(baseUrl)) {
    return url
  }

  if (baseUrl && url.startsWith(baseUrl.replace('https://', '').replace('http://', ''))) {
    return url.startsWith('http') ? url : `https://${url}`
  }

  // If it's a localhost URL, replace with production domain
  if (url.startsWith('http://localhost:3000')) {
    return baseUrl ? url.replace('http://localhost:3000', baseUrl) : url
  }

  // If it's a relative URL starting with /api/media, make it absolute
  if (url.startsWith('/api/media')) {
    return `${baseUrl}${url}`
  }

  // If it's already a full URL (like Vercel Blob), return as is
  if (url.startsWith('http')) {
    return url
  }

  // For any other relative URLs, prepend the production domain
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Gets the production base URL for media
 */
export function getMediaBaseUrl(): string {
  // Always use production URL for media
  return PRODUCTION_BASE_URL && PRODUCTION_BASE_URL.startsWith('http')
    ? PRODUCTION_BASE_URL
    : PRODUCTION_BASE_URL
      ? `https://${PRODUCTION_BASE_URL}`
      : 'https://equilibrium-weld.vercel.app'
}
