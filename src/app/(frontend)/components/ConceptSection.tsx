'use client'

import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
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
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined

  const renderItem = (item: ConceptSectionItem, index: number) => {
    const mediaObj = typeof item.image === 'object' ? (item.image as Media) : undefined
    const itemKey = `concept-section-item-${index}-${mediaObj?.id ?? 'no-id'}`

    return (
      <div
        key={itemKey}
        className={`${styles['concept-section__item']} ${styles[`concept-section__item--${item.type || 'card'}`]}`}
      >
        {mediaObj?.url && (
          <div className={styles['concept-section__item-image']}>
            <Image
              alt={mediaObj.alt || ''}
              src={mediaObj.url}
              width={400}
              height={300}
              className={styles['concept-section__image']}
            />
          </div>
        )}
        <div className={styles['concept-section__item-content']}>
          {item.title && <h3 className={styles['concept-section__item-title']}>{item.title}</h3>}
          {item.description && (
            <p className={styles['concept-section__item-description']}>{item.description}</p>
          )}
          {item.link?.href && item.link?.label && (
            <a
              href={item.link.href}
              className={styles['concept-section__item-link']}
              target={item.link.openInNewTab ? '_blank' : undefined}
              rel={item.link.openInNewTab ? 'noopener noreferrer' : undefined}
            >
              {item.link.label}
            </a>
          )}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (layout === 'carousel') {
      return (
        <div className={styles['concept-section__carousel']}>
          <div className={styles['embla']} ref={emblaRef}>
            <div className={styles['embla__container']}>
              {items.map((item, index) => (
                <div key={`carousel-${index}`} className={styles['embla__slide']}>
                  {renderItem(item, index)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (layout === 'grid') {
      return (
        <div className={styles['concept-section__grid']}>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )
    }

    // Default layout
    return (
      <div className={styles['concept-section__content']}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    )
  }

  return (
    <section
      className={`${styles['concept-section']} ${styles[`concept-section--${layout}`]} ${backgroundImageObj ? styles['concept-section--has-background'] : ''}`}
      style={
        backgroundImageObj?.url
          ? {
              backgroundImage: `url(${backgroundImageObj.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      <div className={styles['concept-section__container']}>
        {(title || subtitle) && (
          <header className={styles['concept-section__header']}>
            {title && <h2 className={styles['concept-section__title']}>{title}</h2>}
            {subtitle && <p className={styles['concept-section__subtitle']}>{subtitle}</p>}
          </header>
        )}

        {renderContent()}

        {ctaHref && ctaLabel && (
          <footer className={styles['concept-section__footer']}>
            <a href={ctaHref} className={`${styles['concept-section__cta']} btn`}>
              {ctaLabel}
            </a>
          </footer>
        )}
      </div>
    </section>
  )
}
