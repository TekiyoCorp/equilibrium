import React from 'react'
import { TiPlus } from 'react-icons/ti'
import type { Media } from '@/payload-types'
import styles from './CourseCards.module.css'
import { Button as UniversalButton } from './Button'

type CourseCard = {
  image: number | Media
  eyebrow?: string | null
  heading?: string | null
}

export function CourseCards({
  title,
  items,
  button,
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
}) {
  return (
    <section className={styles.courseCards}>
      {title && <h2 className={styles.courseCardsTitle}>{title}</h2>}
      <div className={styles.courseCardsGrid}>
        {items?.map((item, idx) => {
          const media = item.image
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          return (
            <article
              className={styles.courseCard}
              key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}
              style={
                mediaObj?.url
                  ? {
                      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${mediaObj.url}) lightgray 50% / cover no-repeat`,
                    }
                  : undefined
              }
            >
              <div className={styles.courseCardOverlay}>
                {item.eyebrow && <span className={styles.courseCardEyebrow}>{item.eyebrow}</span>}
                {item.heading && <h3 className={styles.courseCardHeading}>{item.heading}</h3>}
                <button className={styles.courseCardIcon} aria-label="Open card">
                  <TiPlus />
                </button>
              </div>
            </article>
          )
        })}
      </div>
      {Array.isArray(button) && button[0] && (
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
      )}
    </section>
  )
}
