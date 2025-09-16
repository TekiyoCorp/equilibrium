import React from 'react'
import { TiPlus } from 'react-icons/ti'
import type { Media } from '@/payload-types'
import styles from './CourseCards.module.css'

type CourseCard = {
  image: number | Media
  eyebrow?: string | null
  heading?: string | null
}

export function CourseCards({
  title,
  items,
  ctaLabel,
  ctaHref,
}: {
  title?: string | null
  items: CourseCard[]
  ctaLabel?: string | null
  ctaHref?: string | null
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
      {ctaHref && ctaLabel && (
        <div className={styles.courseCardsCta}>
          <a className={styles.btn} href={ctaHref}>
            {ctaLabel}
          </a>
        </div>
      )}
    </section>
  )
}
