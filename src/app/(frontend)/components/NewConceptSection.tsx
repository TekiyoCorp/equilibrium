'use client'

import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'
import styles from './NewConceptSection.module.css'
import FadeIn from '@/app/animation/fade-in'

type NewConceptSectionProps = {
  title?: string | null
  backgroundImage?: number | Media | null
}

export function NewConceptSection({
  title,
  backgroundImage,
}: NewConceptSectionProps) {
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined

  return (
    <section className={styles['new-concept-section']}>
      <div className={styles['new-concept-section__container']}>
        <div className={styles['new-concept-section__content']}>
          <div className={styles['new-concept-section__text']}>
            <FadeIn from="bottom" duration={0.6}>
              <div className={styles['new-concept-section__heading']}>
                <p className={styles['new-concept-section__title']}>
                  {title || 'Lorem ipsum is a dummy'}
                </p>
              </div>
            </FadeIn>
          </div>

          <div className={styles['new-concept-section__image']}>
            <FadeIn from="bottom" duration={0.6} delay={0.2}>
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
        </div>
      </div>
    </section>
  )
}
