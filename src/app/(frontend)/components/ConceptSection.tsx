'use client'

import Image from 'next/image'
import React from 'react'
import type { Media } from '@/payload-types'
import styles from './ConceptSection.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'

type ConceptSectionProps = {
  title?: string | null
  subtitle?: string | null
  backgroundImage?: number | Media | null
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
}

export function ConceptSection({ title, subtitle, backgroundImage, button }: ConceptSectionProps) {
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined

  return (
    <section className={styles['concept-section']}>
      <div className={styles['concept-section__container']}>
        <div className={styles['concept-section__content']}>
          <div className={styles['concept-section__text']}>
            <FadeIn from="bottom" duration={0.6}>
              {/* Use "Concept" as default label */}
              <div className={styles['concept-section__label']}>Concept</div>
            </FadeIn>
            <FadeIn from="bottom" duration={0.6} delay={0.2}>
              {/* Use title as the main heading if provided, otherwise use subtitle, or fallback */}
              <h2 className={styles['concept-section__heading']}>
                {title || subtitle || 'Lorem ipsum is a dummy.'}
              </h2>
            </FadeIn>
            <FadeIn from="bottom" duration={0.6} delay={0.4}>
              {Array.isArray(button) && button[0] && (
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
              )}
            </FadeIn>
          </div>

          <div className={styles['concept-section__image']}>
            <FadeIn from="bottom" duration={0.6} delay={0.8}>
              {backgroundImageObj?.url && (
                <Image
                  alt={backgroundImageObj.alt || ''}
                  src={backgroundImageObj.url}
                  fill
                  className={styles['concept-section__img']}
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
