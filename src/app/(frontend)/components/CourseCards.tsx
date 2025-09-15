import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'

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
    <section className="course-cards">
      {title && <h2 className="course-cards__title">{title}</h2>}
      <div className="course-cards__grid">
        {items?.map((item, idx) => {
          const media = item.image
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          return (
            <article className="course-card" key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}>
              {mediaObj?.url && (
                <div className="course-card__image">
                  <Image alt={mediaObj.alt || ''} src={mediaObj.url} width={746} height={970} />
                </div>
              )}
              <div className="course-card__overlay">
                {item.eyebrow && <span className="course-card__eyebrow">{item.eyebrow}</span>}
                {item.heading && <h3 className="course-card__heading">{item.heading}</h3>}
                <button className="course-card__icon" aria-label="Open card" />
              </div>
            </article>
          )
        })}
      </div>
      {ctaHref && ctaLabel && (
        <div className="course-cards__cta">
          <a className="btn" href={ctaHref}>
            {ctaLabel}
          </a>
        </div>
      )}
    </section>
  )
}
