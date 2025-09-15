import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'
import { CourseCards } from './CourseCards'
import { OverlayFeatureSection } from './OverlayFeatureSection'
import { TextMediaTiles } from './TextMediaTiles'
import { ConceptSection } from './ConceptSection'
import { FaqSection } from './FaqSection'
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
          return (
            <OverlayFeatureSection
              key={index}
              overlayWord={b.overlayWord}
              backgroundImage={b.backgroundImage}
              heading={b.heading}
              ctaLabel={b.ctaLabel}
              ctaHref={b.ctaHref}
              items={b.items}
            />
          )
        }
        if ((block as any).blockType === 'textMediaTiles') {
          const b = block as any
          return <TextMediaTiles key={index} items={b.items || []} />
        }
        if ((block as any).blockType === 'conceptSection') {
          const b = block as any
          return (
            <ConceptSection
              key={index}
              title={b.title}
              subtitle={b.subtitle}
              backgroundImage={b.backgroundImage}
              layout={b.layout}
              items={b.items || []}
              ctaLabel={b.ctaLabel}
              ctaHref={b.ctaHref}
            />
          )
        }
        if ((block as any).blockType === 'faqSection') {
          const b = block as any
          return <FaqSection key={index} title={b.title} items={b.items || []} />
        }
        return null
      })}
    </>
  )
}
