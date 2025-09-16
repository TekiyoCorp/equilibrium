import Image from 'next/image'
import React from 'react'
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
            <article className={styles.courseCard} key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}>
              {mediaObj?.url && (
                <div className={styles.courseCardImage}>
                  <Image alt={mediaObj.alt || ''} src={mediaObj.url} width={746} height={970} />
                </div>
              )}
              <div className={styles.courseCardOverlay}>
                {item.eyebrow && <span className={styles.courseCardEyebrow}>{item.eyebrow}</span>}
                {item.heading && <h3 className={styles.courseCardHeading}>{item.heading}</h3>}
                <button className={styles.courseCardIcon} aria-label="Open card" />
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
