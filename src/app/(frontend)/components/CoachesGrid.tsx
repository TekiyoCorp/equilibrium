import React from 'react'
import styles from './CoachesGrid.module.css'
import type { Media } from '@/payload-types'
import { transformMediaUrl } from '@/lib/media-utils'
import { Button as UniversalButton } from './Button'

type Item = {
  image?: Media | number | null
  courseName?: string | null
  instructorName?: string | null
  description?: string | null
  ctaLabel?: string | null
  ctaLinkType?: 'url' | 'page' | null
  href?: string | null
  page?: any
  target?: '_self' | '_blank' | null
  ariaLabel?: string | null
}

type CoachesGridProps = {
  eyebrow?: string | null
  title: string
  subtitle?: string | null
  backgroundImage?: Media | number | null
  background?: 'light' | 'dark' | null
  items?: Item[]
  button?: any
  sectionId?: string
}

export function CoachesGrid({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  background,
  items = [],
  button,
  sectionId,
}: CoachesGridProps) {
  const bgClass = background === 'dark' ? styles.bgDark : styles.bgLight
  const bgImageObj = typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined
  const backgroundUrl = transformMediaUrl(bgImageObj?.url)

  return (
    <section
      className={`${styles.section} ${bgClass}`}
      id={sectionId}
      style={
        backgroundUrl
          ? {
              backgroundImage: `url(${backgroundUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className={styles.inner}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {items && items.length > 0 && (
          <div className={styles.grid}>
            {items.map((item, idx) => {
              const imageObj = typeof item.image === 'object' ? (item.image as Media) : undefined
              return (
                <div key={idx} className={styles.cardWrap}>
                  <div className={styles.card}>
                    <div className={styles.cardImage}>
                      {imageObj?.url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={transformMediaUrl(imageObj.url) as string} alt={imageObj?.alt || item.courseName || ''} />
                      )}
                      <div className={styles.cardOverlay} />
                      <div className={styles.cardContent}>
                        <div>
                          {item.courseName && (
                            <h3 className={styles.courseName}>{item.courseName}</h3>
                          )}
                          {item.instructorName && (
                            <p className={styles.instructorName}>{item.instructorName}</p>
                          )}
                        </div>
                        <div>
                          {item.ctaLabel && (
                            <a
                              className={styles.pillCta}
                              href={
                                item.ctaLinkType === 'page' &&
                                item.page &&
                                typeof item.page === 'object'
                                  ? `/${(item.page as any)?.slug ?? ''}`
                                  : item.href || '#'
                              }
                              target={item.target || '_self'}
                              aria-label={item.ariaLabel || item.ctaLabel}
                            >
                              {item.ctaLabel}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {Array.isArray(button) && button[0] && (
          <div className={styles.actions}>
            <UniversalButton block={button[0]} />
          </div>
        )}
      </div>
    </section>
  )
}
