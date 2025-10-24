import React from 'react'
import type { Media } from '@/payload-types'
import styles from './DetailedCourseGrid.module.css'

type GridItem = {
  image: number | Media
  heading: string
  timeLabel?: string | null
  timeValue?: string | null
  difficulty?: number | null
  weekdaySchedule?: string | null
}

export function DetailedCourseGrid({
  title,
  items,
  sectionId,
}: {
  title?: string | null
  items: GridItem[]
  sectionId?: string
}) {
  const renderDots = (count: number) => {
    const total = 5
    return new Array(total)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={[
            styles.difficultyDot,
            i < Math.max(0, Math.min(total, count)) ? '' : styles.dimmed,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))
  }

  return (
    <section className={styles.section} id={sectionId}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.grid}>
        {items?.map((item, idx) => {
          const media = item.image
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          const bg = mediaObj?.url ? { backgroundImage: `url(${mediaObj.url})` } : undefined

          return (
            <article
              key={`detailed-card-${idx}-${mediaObj?.id ?? 'no-id'}`}
              className={styles.card}
              style={bg}
            >
              <div className={styles.overlay}>
                <h3 className={styles.heading}>{item.heading}</h3>
                <div className={styles.meta}>
                  <div className={styles.row}>
                    <span>{item.timeLabel || 'Time'} : </span>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {item.timeValue || '50 minutes'}
                    </span>
                  </div>
                  <div className={styles.row}>
                    <span>Intensity : </span>
                    {renderDots(Number(item.difficulty ?? 3))}
                  </div>
                  <div className={styles.row}>
                    <span className={styles.schedule}>
                      {item.weekdaySchedule || 'Monday - Friday 5:30 - 22h30'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
