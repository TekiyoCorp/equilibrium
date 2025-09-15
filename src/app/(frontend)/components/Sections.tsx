import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'
import { CourseCards } from './CourseCards'
import type { Media } from '@/payload-types'

type SectionsProps = {
  sections?: Array<{
    blockType: 'mediaCardSlider'
    items: Array<{ image: any; text?: string | null }>
  }>
}

export function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length === 0) return null

  return (
    <>
      {sections.map((block, index) => {
        if (block.blockType === 'mediaCardSlider') {
          return <MediaCardSlider key={index} items={block.items} />
        }
        if ((block as any).blockType === 'courseCards') {
          const b = block as any
          return (
            <CourseCards
              key={index}
              title={b.title}
              items={b.items}
              ctaHref={b.ctaHref}
              ctaLabel={b.ctaLabel}
            />
          )
        }
        if ((block as any).blockType === 'overlayFeatureSection') {
          const b = block as any
          const bg = b.backgroundImage as Media | number | undefined
          const bgObj = typeof bg === 'object' ? (bg as Media) : undefined
          return (
            <section
              key={index}
              className="overlay-feature-hero"
              style={bgObj?.url ? { backgroundImage: `url(${bgObj.url})` } : undefined}
            >
              {b.overlayWord && (
                <div className="overlay-word" aria-hidden>
                  {b.overlayWord}
                </div>
              )}
              <div className="overlay-content">
                {b.heading && <h2 className="ofh-heading">{b.heading}</h2>}
                {b.ctaHref && b.ctaLabel && (
                  <a className="ofh-cta" href={b.ctaHref}>
                    {b.ctaLabel}
                  </a>
                )}
                <div className="ofh-separator" />
                <div className="ofh-features">
                  {(b.items || []).slice(0, 3).map((it: any, idx: number) => (
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
        return null
      })}
    </>
  )
}
