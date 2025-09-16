import React from 'react'
import type { Media } from '@/payload-types'
import styles from './OverlayFeatureSection.module.css'
import { Button as UniversalButton } from './Button'

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
