'use client'

import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'
import styles from './ConceptSection.module.css'

type ConceptSectionItem = {
  type?: 'text' | 'image' | 'card'
  image?: number | Media | null
  title?: string | null
  description?: string | null
  link?: {
    href?: string | null
    label?: string | null
    openInNewTab?: boolean | null
  } | null
}

type ConceptSectionProps = {
  title?: string | null
  subtitle?: string | null
  backgroundImage?: number | Media | null
  layout?: 'default' | 'grid' | 'carousel'
  items?: ConceptSectionItem[]
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function ConceptSection({
  title,
  subtitle,
  backgroundImage,
  layout = 'default',
  items = [],
  ctaLabel,
  ctaHref,
}: ConceptSectionProps) {
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined

  return (
    <section className={styles['concept-section']}>
      <div className={styles['concept-section__container']}>
        <div className={styles['concept-section__content']}>
          <div className={styles['concept-section__text']}>
            {/* Use "Concept" as default label */}
            <div className={styles['concept-section__label']}>Concept</div>
            {/* Use title as the main heading if provided, otherwise use subtitle, or fallback */}
            <h2 className={styles['concept-section__heading']}>
              {title || subtitle || 'Lorem ipsum is a dummy.'}
            </h2>
            {ctaHref && ctaLabel && (
              <a href={ctaHref} className={styles['concept-section__cta']}>
                {ctaLabel}
              </a>
            )}
          </div>
          <div className={styles['concept-section__image']}>
            {backgroundImageObj?.url && (
              <Image
                alt={backgroundImageObj.alt || ''}
                src={backgroundImageObj.url}
                fill
                className={styles['concept-section__img']}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
