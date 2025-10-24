// Normalize Payload page slugs into frontend-friendly hrefs.
// - Keeps absolute URLs, mailto/tel links untouched
// - Maps the CMS "home" slug to "/"
// - Ensures other slugs receive a single leading slash

const EXTERNAL_PATTERN = /^(https?:)?\/\//i

const isExternalLink = (value: string) =>
  EXTERNAL_PATTERN.test(value) || value.startsWith('mailto:') || value.startsWith('tel:')

export function resolvePageHref(slugOrHref?: string | null): string {
  if (!slugOrHref) return '#'

  const value = String(slugOrHref).trim()
  if (!value) return '#'

  if (isExternalLink(value)) {
    return value
  }

  const normalized = value.replace(/^\/+|\/+$/g, '')
  if (!normalized) return '#'

  if (normalized === 'home') {
    return '/'
  }

  if (value.startsWith('/')) {
    return value
  }

  return `/${normalized}`
}
