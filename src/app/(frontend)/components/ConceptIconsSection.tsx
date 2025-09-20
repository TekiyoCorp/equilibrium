'use client'

import React from 'react'
import Image from 'next/image'
import styles from './ConceptIconsSection.module.css'
import FadeIn from '@/app/animation/fade-in'
import type { Media } from '@/payload-types'

type ConceptItem = {
  icon: number | Media | null
  label: string
}

type ConceptIconsSectionProps = {
  title?: string | null
  items?: ConceptItem[]
  backgroundColor?: string | null
  customBackgroundColor?: string | null
}

// Helper function to get media object
const getMediaObject = (icon: number | Media | null): Media | null => {
  if (typeof icon === 'object' && icon !== null) {
    return icon as Media
  }
  return null
}

export function ConceptIconsSection({
  title = 'Concept',
  items = [
    { icon: null, label: 'Concept' },
    { icon: null, label: 'Concept' },
    { icon: null, label: 'Concept' },
  ],
  backgroundColor = '#ffffff',
  customBackgroundColor,
}: ConceptIconsSectionProps) {
  const backgroundStyle = {
    backgroundColor:
      backgroundColor === 'custom'
        ? customBackgroundColor || '#ffffff'
        : backgroundColor || '#ffffff',
  }

  return (
    <section className={styles['concept-icons-section']} style={backgroundStyle}>
      <div className={styles['concept-icons-section__container']}>
        <FadeIn from="top" duration={0.6}>
          <div className={styles['concept-icons-section__content']}>
            {items.map((item, index) => {
              const mediaObject = getMediaObject(item.icon)
              return (
                <FadeIn key={index} from="bottom" duration={0.6} delay={index * 0.2}>
                  <div className={styles['concept-icons-section__item']}>
                    <div className={styles['concept-icons-section__icon']}>
                      {mediaObject?.url ? (
                        <Image
                          src={mediaObject.url}
                          alt={mediaObject.alt || item.label}
                          width={80}
                          height={80}
                          className={styles['concept-icons-section__img']}
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <div className={styles['concept-icons-section__placeholder']}>
                          <span>Icon</span>
                        </div>
                      )}
                    </div>
                    <div className={styles['concept-icons-section__label']}>{item.label}</div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
