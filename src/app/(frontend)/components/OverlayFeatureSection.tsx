import React from 'react'
import type { Media } from '@/payload-types'

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
      className="overlay-feature-hero"
      style={bgObj?.url ? { backgroundImage: `url(${bgObj.url})` } : undefined}
    >
      {overlayWord && (
        <div className="overlay-word" aria-hidden>
          {overlayWord}
        </div>
      )}
      <div className="overlay-content">
        {heading && <h2 className="ofh-heading">{heading}</h2>}
        {ctaHref && ctaLabel && (
          <a className="ofh-cta" href={ctaHref}>
            {ctaLabel}
          </a>
        )}
        <div className="ofh-separator" />
        <div className="ofh-features">
          {(items || []).slice(0, 3).map((it, idx) => (
            <div className="ofh-feature" key={`ofh-${idx}`}>
              {it.title && <div className="ofh-feature-title">{it.title}</div>}
              {it.description && <div className="ofh-feature-desc">{it.description}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-overlay" />
    </section>
  )
}
