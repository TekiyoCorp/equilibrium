import type { Block } from 'payload'
import { randomUUID } from 'crypto'
import { Button } from './Button'
import { Link } from './Link'

const createId = () => {
  try {
    return randomUUID()
  } catch (_error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return Math.random().toString(36).slice(2, 11)
  }
}

const fallbackLabel = 'En savoir plus'

const normalizeLinkBlocks = (rawLink: any, heading?: string | null) => {
  if (!rawLink) {
    return undefined
  }

  const ensureLabel = (label?: string | null) => label?.trim() || heading?.trim() || fallbackLabel

  if (Array.isArray(rawLink)) {
    const normalizedBlocks = rawLink
      .map((block) => {
        if (!block) return undefined
        if (block.blockType && block.blockType !== 'link') {
          return { ...block }
        }
        const label = ensureLabel(block.label)
        return {
          ...block,
          blockType: 'link',
          id: block.id || createId(),
          label,
          linkType: block.linkType ?? 'url',
          target: block.target ?? '_self',
          ariaLabel: block.ariaLabel ?? label,
        }
      })
      .filter(Boolean)

    return normalizedBlocks.length ? normalizedBlocks : undefined
  }

  const legacy = rawLink as Record<string, any>
  const label = ensureLabel(legacy.label)
  const linkType: 'url' | 'page' = legacy.linkType === 'page' ? 'page' : 'url'
  const target = legacy.target ?? '_self'
  const legacyHref: string | undefined = legacy.href ?? undefined
  const legacyPage = legacy.page ?? undefined
  const legacySlug: string | undefined = legacy.pageSlug ?? undefined

  if (linkType === 'page') {
    if (legacyPage) {
      return [
        {
          id: createId(),
          blockType: 'link',
          label,
          linkType: 'page',
          page: legacyPage,
          target,
          ariaLabel: legacy.ariaLabel ?? label,
        },
      ]
    }

    if (legacySlug) {
      const sanitizedSlug = String(legacySlug).replace(/^\//, '')
      return [
        {
          id: createId(),
          blockType: 'link',
          label,
          linkType: 'url',
          href: `/${sanitizedSlug}`,
          target,
          ariaLabel: legacy.ariaLabel ?? label,
        },
      ]
    }
  }

  if (!legacyHref) {
    return undefined
  }

  return [
    {
      id: createId(),
      blockType: 'link',
      label,
      linkType: 'url',
      href: legacyHref,
      target,
      ariaLabel: legacy.ariaLabel ?? label,
    },
  ]
}

const normalizeItems = (items: any[] | undefined) => {
  if (!Array.isArray(items)) {
    return items
  }

  return items.map((item) => {
    if (!item) return item
    const normalizedLink = normalizeLinkBlocks(item.link, item.heading ?? item.eyebrow)
    if (normalizedLink) {
      return { ...item, link: normalizedLink }
    }

    if (item.link === undefined || item.link === null) {
      return item
    }

    const clone = { ...item }
    delete clone.link
    return clone
  })
}

export const CourseCards: Block = {
  slug: 'courseCards',
  labels: {
    singular: 'Course Cards',
    plural: 'Course Cards',
  },
  hooks: {
    afterRead: [({ data }) => {
      if (!data) return data
      if (Array.isArray(data.items)) {
        data.items = normalizeItems(data.items)
      }
      return data
    }],
    beforeValidate: [({ data }) => {
      if (!data) return data
      if (Array.isArray(data.items)) {
        data.items = normalizeItems(data.items)
      }
      return data
    }],
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Cards',
      type: 'array',
      labels: { singular: 'Card', plural: 'Cards' },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'textarea',
        },
        {
          name: 'expandedText',
          label: 'Expanded Text',
          type: 'textarea',
          admin: {
            description: 'Text displayed when the card is expanded',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'blocks',
          maxRows: 1,
          blocks: [Link],
          admin: {
            description: 'Optional link for the card. Leave empty to keep the card static.',
          },
        },
      ],
    },
    {
      name: 'button',
      label: 'Button',
      type: 'blocks',
      maxRows: 1,
      blocks: [Button],
    },
  ],
}
