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

type SectionsProps = {
  sections?: Array<{
    blockType: 'mediaCardSlider'
    items: Array<{ image: any; text?: string | null }>
  }>
}

export function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length === 0) return null

  return (
    <div className="sections-wrapper">
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
        if ((block as any).blockType === 'detailedCourseGrid') {
          const b = block as any
          return <DetailedCourseGrid key={index} title={b.title} items={b.items || []} />
        }
        if ((block as any).blockType === 'textMediaTiles') {
          const b = block as any
          return <TextMediaTiles key={index} items={b.items || []} />
        }
        if ((block as any).blockType === 'textImageBlock') {
          const b = block as any
          return <TextImageBlock key={index} text={b.text} subtitle={b.subtitle} image={b.image} />
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
        if ((block as any).blockType === 'newConceptSection') {
          const b = block as any
          return (
            <NewConceptSection
              key={index}
              label={b.label}
              title={b.title}
              subtitle={b.subtitle}
              backgroundImage={b.backgroundImage}
              description={b.description}
            />
          )
        }
        if ((block as any).blockType === 'faqSection') {
          const b = block as any
          return (
            <FaqSection
              key={index}
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
              key={index}
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
              key={index}
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
              key={index}
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
              key={index}
              title={b.title}
              items={b.items}
              backgroundColor={b.backgroundColor}
              customBackgroundColor={b.customBackgroundColor}
            />
          )
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
    </div>
  )
}
