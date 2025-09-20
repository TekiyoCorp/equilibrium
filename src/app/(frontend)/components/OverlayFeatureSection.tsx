'use client'

import React from 'react'
import type { Media } from '@/payload-types'
import styles from './OverlayFeatureSection.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'

type OverlayFeatureSectionProps = {
  overlayWord?: string | null
  backgroundImage?: Media | number | null
  heading?: string | null
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
  items?: Array<{
    title?: string | null
    description?: string | null
  }>
}

export function OverlayFeatureSection({
  overlayWord,
  backgroundImage,
  heading,
  button,
  items,
}: OverlayFeatureSectionProps) {
  const bg = backgroundImage as Media | number | undefined
  const bgObj = typeof bg === 'object' && bg !== null ? (bg as Media) : undefined

  console.log('OverlayFeatureSection - backgroundImage:', backgroundImage)
  console.log('OverlayFeatureSection - bgObj:', bgObj)
  console.log('OverlayFeatureSection - bgObj.url:', bgObj?.url)

  // Fallback pour image manquante
  const backgroundStyle = bgObj?.url
    ? {
        backgroundImage: `url(${bgObj.url})`,
        backgroundColor: '#f5f5f5', // Fallback si image ne charge pas
      }
    : {
        backgroundColor: '#f5f5f5', // Background par défaut
      }

  return (
    <section className={styles.root} style={backgroundStyle}>
      {overlayWord && (
        <div className={styles.overlayWord} aria-hidden>
          {overlayWord}
        </div>
      )}
      <div className={styles.overlayContent}>
        <div className={styles.headerRow}>
          <FadeIn from="bottom" duration={0.2}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
          </FadeIn>
          <FadeIn from="bottom" duration={0.2} delay={0.1}>
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

        <FadeIn from="bottom" duration={0.3} delay={0.15}>
          <div className={styles.separator} />
        </FadeIn>

        <div className={styles.features}>
          {(items || []).slice(0, 3).map((it, idx) => (
            <FadeIn key={`ofh-${idx}`} from="bottom" duration={0.3} delay={0.2 + idx * 0.1}>
              <div>
                {it.title && <div className={styles.featureTitle}>{it.title}</div>}
                {it.description && <div className={styles.featureDesc}>{it.description}</div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className={styles.heroOverlay} />
    </section>
  )
}
