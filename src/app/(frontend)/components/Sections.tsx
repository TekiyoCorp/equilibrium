import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'
import { CourseCards } from './CourseCards'
import { OverlayFeatureSection } from './OverlayFeatureSection'
import { TextMediaTiles } from './TextMediaTiles'
import { ConceptSection } from './ConceptSection'
import { FaqSection } from './FaqSection'
import { Button as UniversalButton } from './Button'
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
          return <CourseCards key={index} title={b.title} items={b.items} button={b.button} />
        }
        if ((block as any).blockType === 'overlayFeatureSection') {
          const b = block as any
          return (
            <OverlayFeatureSection
              key={index}
              overlayWord={b.overlayWord}
              backgroundImage={b.backgroundImage}
              heading={b.heading}
              button={b.button}
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
              button={b.button}
            />
          )
        }
        if ((block as any).blockType === 'faqSection') {
          const b = block as any
          return <FaqSection key={index} title={b.title} items={b.items || []} />
        }
        if ((block as any).blockType === 'button') {
          const b = block as any
          return (
            <div key={index} style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
              <UniversalButton
                label={b.label}
                href={b.href || '#'}
                linkType={b.linkType || 'url'}
                page={b.page}
                variant={b.variant}
                target={b.target}
                fullWidth={b.fullWidth}
                ariaLabel={b.ariaLabel}
              />
            </div>
          )
        }
        return null
      })}
    </>
  )
}
