'use client'

import React, { useMemo, useState } from 'react'
import { TiPlus } from 'react-icons/ti'
import type { Media } from '@/payload-types'
import styles from './CourseCards.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'
import { motion, AnimatePresence } from 'framer-motion'

type PayloadLinkBlock = {
  blockType: 'link'
  id?: string
  label: string
  linkType?: 'url' | 'page' | null
  href?: string | null
  page?: any
  target?: '_self' | '_blank' | null
  ariaLabel?: string | null
}

type LegacyLinkShape = {
  label?: string | null
  linkType?: 'url' | 'page' | null
  href?: string | null
  page?: any
  pageSlug?: string | null
  target?: '_self' | '_blank' | null
}

type CourseCard = {
  image: number | Media
  eyebrow?: string | null
  heading?: string | null
  expandedText?: string | null
  link?: PayloadLinkBlock[] | LegacyLinkShape | null
}

type PrimaryLinkMeta = {
  href: string
  target: '_self' | '_blank'
  ariaLabel: string
}

const fallbackLabel = 'En savoir plus'

const sanitizeSlug = (slug?: string | null) => {
  if (!slug) return undefined
  const trimmed = String(slug).trim()
  if (!trimmed) return undefined
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

const ensureLabel = (label?: string | null, heading?: string | null, eyebrow?: string | null) =>
  label?.trim() || heading?.trim() || eyebrow?.trim() || fallbackLabel

const normalizeBlocksArray = (
  blocks: PayloadLinkBlock[] | undefined,
  heading?: string | null,
  eyebrow?: string | null,
) => {
  if (!blocks) return undefined

  const normalized = blocks
    .filter((block): block is PayloadLinkBlock => block?.blockType === 'link')
    .map((block) => ({
      ...block,
      label: ensureLabel(block.label, heading, eyebrow),
      linkType: (block.linkType ?? 'url') as 'url' | 'page',
      target: (block.target ?? '_self') as '_self' | '_blank',
      ariaLabel: block.ariaLabel ?? ensureLabel(block.label, heading, eyebrow),
    }))

  return normalized.length ? normalized : undefined
}

const coerceLinkBlocks = (
  link: CourseCard['link'],
  heading?: string | null,
  eyebrow?: string | null,
): PayloadLinkBlock[] | undefined => {
  if (!link) return undefined

  if (Array.isArray(link)) {
    return normalizeBlocksArray(link, heading, eyebrow)
  }

  const legacy = link as LegacyLinkShape
  const label = ensureLabel(legacy.label, heading, eyebrow)
  const linkType = legacy.linkType === 'page' ? 'page' : 'url'
  const target = (legacy.target ?? '_self') as '_self' | '_blank'

  if (linkType === 'page') {
    if (legacy.page && typeof legacy.page === 'object') {
      return [
        {
          blockType: 'link',
          label,
          linkType: 'page',
          page: legacy.page,
          target,
          ariaLabel: legacy.label ?? label,
        },
      ]
    }

    const slugHref = sanitizeSlug(legacy.pageSlug)
    if (slugHref) {
      return [
        {
          blockType: 'link',
          label,
          linkType: 'url',
          href: slugHref,
          target,
          ariaLabel: legacy.label ?? label,
        },
      ]
    }
  }

  if (!legacy.href) {
    return undefined
  }

  return [
    {
      blockType: 'link',
      label,
      linkType: 'url',
      href: legacy.href,
      target,
      ariaLabel: legacy.label ?? label,
    },
  ]
}

const derivePrimaryLink = (blocks?: PayloadLinkBlock[]): PrimaryLinkMeta | undefined => {
  if (!Array.isArray(blocks)) return undefined

  for (const block of blocks) {
    if (!block) continue
    const linkType = (block.linkType ?? 'url') as 'url' | 'page'
    const target = (block.target ?? '_self') as '_self' | '_blank'
    let href = block.href ?? undefined

    if (linkType === 'page') {
      if (block.page && typeof block.page === 'object') {
        const slug = sanitizeSlug(block.page?.slug)
        if (slug) {
          href = slug
        }
      }

      if (!href && block.href) {
        href = block.href
      }
    }

    if (!href) continue

    return {
      href,
      target,
      ariaLabel: block.ariaLabel ?? block.label,
    }
  }

  return undefined
}

type NormalizedCourseCard = Omit<CourseCard, 'link'> & {
  linkBlocks?: PayloadLinkBlock[]
  primaryLink?: PrimaryLinkMeta
}

const normalizeCards = (items: CourseCard[] | undefined): NormalizedCourseCard[] => {
  if (!Array.isArray(items)) return []

  return items.map((item) => {
    const linkBlocks = coerceLinkBlocks(item.link, item.heading, item.eyebrow)
    const primaryLink = derivePrimaryLink(linkBlocks)

    if (!linkBlocks) {
      const copy = { ...item }
      delete (copy as any).link
      return { ...copy }
    }

    return { ...item, linkBlocks, primaryLink }
  })
}

export function CourseCards({
  title,
  items,
  button,
  sectionId,
}: {
  title?: string | null
  items: CourseCard[]
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: number | Media | null | any
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
  sectionId?: string
}) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const normalizedItems = useMemo(() => normalizeCards(items), [items])

  const toggleCard = (index: number, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section className={styles.courseCards} id={sectionId}>
      <FadeIn from="bottom" duration={0.2}>
        {title && <h2 className={styles.courseCardsTitle}>{title}</h2>}
      </FadeIn>

      <div className={styles.courseCardsGrid}>
        {normalizedItems.map((item, idx) => {
          const media = item.image
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          const cardContent = (
            <article
              className={styles.courseCard}
              style={
                mediaObj?.url
                  ? {
                      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${mediaObj.url}) lightgray 50% / cover no-repeat`,
                    }
                  : undefined
              }
            >
              <AnimatePresence>
                {expandedCards.has(idx) && (
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={styles.expandedOverlay}
                  />
                )}
              </AnimatePresence>

              <div className={styles.courseCardOverlay}>
                <AnimatePresence mode="wait">
                  {!expandedCards.has(idx) ? (
                    <motion.div
                      key="original"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.eyebrow && (
                        <span className={styles.courseCardEyebrow}>{item.eyebrow}</span>
                      )}
                      {item.heading && (
                        <h3 className={styles.courseCardHeading}>{item.heading}</h3>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.15 }}
                      className={styles.expandedContent}
                    >
                      <p className={styles.expandedText}>
                        {item.expandedText ||
                          'Découvrez nos formations expertes conçues pour développer vos compétences et accélérer votre carrière professionnelle.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  className={`${styles.courseCardIcon} ${expandedCards.has(idx) ? styles.rotated : ''}`}
                  aria-label={expandedCards.has(idx) ? 'Close card' : 'Open card'}
                  onClick={(e) => toggleCard(idx, e)}
                  type="button"
                >
                  <TiPlus style={{ pointerEvents: 'none' }} />
                </button>
              </div>
            </article>
          )

          if (item.primaryLink) {
            const rel = item.primaryLink.target === '_blank' ? 'noreferrer noopener' : undefined
            return (
              <FadeIn
                key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}
                from="bottom"
                duration={0.3}
                delay={0.1 + idx * 0.05}
              >
                <a
                  className={styles.courseCardLink}
                  href={item.primaryLink.href}
                  target={item.primaryLink.target}
                  rel={rel}
                  aria-label={item.primaryLink.ariaLabel}
                >
                  {cardContent}
                </a>
              </FadeIn>
            )
          }

          return (
            <FadeIn
              key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}
              from="bottom"
              duration={0.3}
              delay={0.1 + idx * 0.05}
            >
              {cardContent}
            </FadeIn>
          )
        })}
      </div>

      {Array.isArray(button) && button[0] && (
        <FadeIn from="bottom" duration={0.3} delay={0.2}>
          <div className={styles.courseCardsCta}>
            <UniversalButton
              label={button[0].label}
              href={button[0].href || '#'}
              linkType={button[0].linkType || 'url'}
              page={button[0].page as any}
              variant={button[0].variant}
              target={button[0].target}
              fullWidth={button[0].fullWidth}
              ariaLabel={button[0].ariaLabel}
            />
          </div>
        </FadeIn>
      )}
    </section>
  )
}
