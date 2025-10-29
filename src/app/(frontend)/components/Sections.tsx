import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'
import { CourseCards } from './CourseCards'
import { OverlayFeatureSection } from './OverlayFeatureSection'
import { TextMediaTiles } from './TextMediaTiles'
import { ConceptSection } from './ConceptSection'
import { FaqSection } from './FaqSection'
import { Button as UniversalButton } from './Button'
import { DetailedCourseGrid } from './DetailedCourseGrid'
import { CoachesGrid } from './CoachesGrid'
import { NewConceptSection } from './NewConceptSection'
import { TextImageBlock } from './TextImageBlock'
import { Location } from './Location'
import { ChatSection } from './ChatSection'
import { ConceptIconsSection } from './ConceptIconsSection'
import { AboutUsSection } from './AboutUsSection'

type SectionsProps = {
  sections?: Array<{
    blockType: 'mediaCardSlider'
    items: Array<{ image: any; text?: string | null }>
  }>
}

const sanitizeForId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

const deriveSectionId = (block: any, index: number) => {
  const candidates = [block?.sectionId, block?.anchor, block?.blockName, block?.title, block?.heading]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      const sanitized = sanitizeForId(candidate)
      if (sanitized) {
        return sanitized
      }
    }
  }

  if (typeof block?.id === 'string' && block.id.trim()) {
    const sanitizedId = sanitizeForId(block.id)
    return sanitizedId ? sanitizedId : `section-${block.id.trim()}`
  }

  return `section-${index + 1}`
}

export function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length === 0) return null

  return (
    <div className="sections-wrapper">
      {sections.map((block, index) => {
        const sectionId = deriveSectionId(block, index)
        const key = (block as any)?.id ?? index

        if (block.blockType === 'mediaCardSlider') {
          const b = block as any
          return <MediaCardSlider key={key} sectionId={sectionId} items={b.items} title={b.title} />
        }
        if ((block as any).blockType === 'courseCards') {
          const b = block as any
          return (
            <CourseCards
              key={key}
              sectionId={sectionId}
              title={b.title}
              items={b.items}
              button={b.button}
            />
          )
        }
        if ((block as any).blockType === 'overlayFeatureSection') {
          const b = block as any
          return (
            <OverlayFeatureSection
              key={key}
              sectionId={sectionId}
              overlayWord={b.overlayWord}
              backgroundImage={b.backgroundImage}
              heading={b.heading}
              button={b.button}
              items={b.items}
            />
          )
        }
        if ((block as any).blockType === 'detailedCourseGrid') {
          const b = block as any
          return (
            <DetailedCourseGrid
              key={key}
              sectionId={sectionId}
              title={b.title}
              items={b.items || []}
            />
          )
        }
        if ((block as any).blockType === 'textMediaTiles') {
          const b = block as any
          return <TextMediaTiles key={key} sectionId={sectionId} items={b.items || []} />
        }
        if ((block as any).blockType === 'textImageBlock') {
          const b = block as any
          return (
            <TextImageBlock
              key={key}
              sectionId={sectionId}
              text={b.text}
              subtitle={b.subtitle}
              image={b.image}
            />
          )
        }
        if ((block as any).blockType === 'conceptSection') {
          const b = block as any
          return (
            <ConceptSection
              key={key}
              sectionId={sectionId}
              title={b.title}
              subtitle={b.subtitle}
              backgroundImage={b.backgroundImage}
              button={b.button}
            />
          )
        }
        if ((block as any).blockType === 'newConceptSection') {
          const b = block as any
          return (
            <NewConceptSection
              key={key}
              sectionId={sectionId}
              title={b.title}
              backgroundImage={b.backgroundImage}
            />
          )
        }
        if ((block as any).blockType === 'faqSection') {
          const b = block as any
          return (
            <FaqSection
              key={key}
              sectionId={sectionId}
              title={b.title}
              items={b.items || []}
              largeImage={b.largeImage}
              smallImage={b.smallImage}
            />
          )
        }
        if ((block as any).blockType === 'coachesGrid') {
          const b = block as any
          return (
            <CoachesGrid
              key={key}
              sectionId={sectionId}
              eyebrow={b.eyebrow}
              title={b.title}
              subtitle={b.subtitle}
              backgroundImage={b.backgroundImage}
              background={b.background}
              items={b.items}
              button={b.button}
            />
          )
        }
        if ((block as any).blockType === 'location') {
          const b = block as any
          return (
            <Location
              key={key}
              sectionId={sectionId}
              locations={b.locations}
              mapPlaceholder={b.mapPlaceholder}
              whatsappText={b.whatsappText}
              whatsappIcon={b.whatsappIcon}
            />
          )
        }
        if ((block as any).blockType === 'chatSection') {
          const b = block as any
          return (
            <ChatSection
              key={key}
              sectionId={sectionId}
              title={b.title}
              messages={b.messages}
              whatsappText={b.whatsappText}
              whatsappIcon={b.whatsappIcon}
              whatsappUrl={b.whatsappUrl}
            />
          )
        }
        if ((block as any).blockType === 'conceptIconsSection') {
          const b = block as any
          return (
            <ConceptIconsSection
              key={key}
              sectionId={sectionId}
              title={b.title}
              items={b.items}
              backgroundColor={b.backgroundColor}
              customBackgroundColor={b.customBackgroundColor}
            />
          )
        }
        if ((block as any).blockType === 'aboutUsSection') {
          const b = block as any
          return (
            <AboutUsSection
              key={key}
              sectionId={sectionId}
              items={b.items || []}
            />
          )
        }
        if ((block as any).blockType === 'button') {
          const b = block as any
          return (
            <div
              key={key}
              id={sectionId}
              style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}
            >
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
    </div>
  )
}
