'use client'

import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'
import styles from './NewConceptSection.module.css'
import FadeIn from '@/app/animation/fade-in'

type NewConceptSectionProps = {
  label?: string | null
  title?: string | null
  subtitle?: string | null
  backgroundImage?: number | Media | null
  description?: string | null
}

export function NewConceptSection({
  label,
  title,
  subtitle,
  backgroundImage,
  description,
}: NewConceptSectionProps) {
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined

  return (
    <section className={styles['new-concept-section']}>
      <div className={styles['new-concept-section__container']}>
        <div className={styles['new-concept-section__content']}>
          <div className={styles['new-concept-section__text']}>
            <FadeIn from="left" duration={1.2}>
              <div className={styles['new-concept-section__label']}>{label || 'Concept'}</div>
            </FadeIn>

            <FadeIn from="left" duration={1.2} delay={0.2}>
              <div className={styles['new-concept-section__heading']}>
                <p className={styles['new-concept-section__title']}>
                  {title || 'Lorem ipsum is a dummy'}
                </p>
                {subtitle && <p className={styles['new-concept-section__subtitle']}>{subtitle}</p>}
              </div>
            </FadeIn>
          </div>

          <div className={styles['new-concept-section__image']}>
            <FadeIn from="right" duration={1.2} delay={0.4}>
              {backgroundImageObj?.url && (
                <Image
                  alt={backgroundImageObj.alt || ''}
                  src={backgroundImageObj.url}
                  fill
                  className={styles['new-concept-section__img']}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </FadeIn>
          </div>

          <div className={styles['new-concept-section__description']}>
            <FadeIn from="left" duration={1.2} delay={0.6}>
              <p className={styles['new-concept-section__description-text']}>
                {description ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
