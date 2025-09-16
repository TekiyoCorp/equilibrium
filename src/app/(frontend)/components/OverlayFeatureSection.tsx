import React from 'react'
import type { Media } from '@/payload-types'
import styles from './OverlayFeatureSection.module.css'

type OverlayFeatureSectionProps = {
  overlayWord?: string | null
  backgroundImage?: Media | number | null
  heading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  items?: Array<{
    title?: string | null
    description?: string | null
  }>
}

export function OverlayFeatureSection({
  overlayWord,
  backgroundImage,
  heading,
  ctaLabel,
  ctaHref,
  items,
}: OverlayFeatureSectionProps) {
  const bg = backgroundImage as Media | number | undefined
  const bgObj = typeof bg === 'object' ? (bg as Media) : undefined

  return (
    <section
      className={styles.root}
      style={bgObj?.url ? { backgroundImage: `url(${bgObj.url})` } : undefined}
    >
      {overlayWord && (
        <div className={styles.overlayWord} aria-hidden>
          {overlayWord}
        </div>
      )}
      <div className={styles.overlayContent}>
        <div className={styles.headerRow}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {ctaHref && ctaLabel && (
            <a className={styles.cta} href={ctaHref}>
              {ctaLabel}
            </a>
          )}
        </div>
        <div className={styles.separator} />
        <div className={styles.features}>
          {(items || []).slice(0, 3).map((it, idx) => (
            <div key={`ofh-${idx}`}>
              {it.title && <div className={styles.featureTitle}>{it.title}</div>}
              {it.description && <div className={styles.featureDesc}>{it.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.heroOverlay} />
    </section>
  )
}
