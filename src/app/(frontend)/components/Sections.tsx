import React, { memo } from 'react'
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
import type {
  Block,
  MediaCardSliderBlock,
  CourseCardsBlock,
  OverlayFeatureSectionBlock,
  DetailedCourseGridBlock,
  TextMediaTilesBlock,
  TextImageBlockBlock,
  ConceptSectionBlock,
  NewConceptSectionBlock,
  FaqSectionBlock,
  CoachesGridBlock,
  LocationBlock,
  ChatSectionBlock,
  ConceptIconsSectionBlock,
  ButtonBlock,
} from '@/types/blocks'

type SectionsProps = {
  sections?: Block[]
}

export const Sections = memo(function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length === 0) return null

  return (
    <div className="sections-wrapper">
      {sections.map((block, index) => {
        if (block.blockType === 'mediaCardSlider') {
          const b = block as MediaCardSliderBlock
          return <MediaCardSlider key={index} items={b.items} title={b.title || undefined} />
        }
        if (block.blockType === 'courseCards') {
          const b = block as CourseCardsBlock
          return <CourseCards key={index} title={b.title} items={b.items} button={b.button} />
        }
        if (block.blockType === 'overlayFeatureSection') {
          const b = block as OverlayFeatureSectionBlock
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
        if (block.blockType === 'detailedCourseGrid') {
          const b = block as DetailedCourseGridBlock
          return <DetailedCourseGrid key={index} title={b.title} items={b.items} />
        }
        if (block.blockType === 'textMediaTiles') {
          const b = block as TextMediaTilesBlock
          return <TextMediaTiles key={index} items={b.items} />
        }
        if (block.blockType === 'textImageBlock') {
          const b = block as TextImageBlockBlock
          return <TextImageBlock key={index} text={b.text} subtitle={b.subtitle} image={b.image} />
        }
        if (block.blockType === 'conceptSection') {
          const b = block as ConceptSectionBlock
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
        if (block.blockType === 'newConceptSection') {
          const b = block as NewConceptSectionBlock
          return (
            <NewConceptSection
              key={index}
              title={b.title}
              subtitle={b.subtitle}
              backgroundImage={b.backgroundImage}
              button={b.button}
            />
          )
        }
        if (block.blockType === 'faqSection') {
          const b = block as FaqSectionBlock
          return <FaqSection key={index} title={b.title} items={b.items} />
        }
        if (block.blockType === 'coachesGrid') {
          const b = block as CoachesGridBlock
          return <CoachesGrid key={index} title={b.title} subtitle={b.subtitle} items={b.items} />
        }
        if (block.blockType === 'location') {
          const b = block as LocationBlock
          return (
            <Location key={index} title={b.title} subtitle={b.subtitle} locations={b.locations} />
          )
        }
        if (block.blockType === 'chatSection') {
          const b = block as ChatSectionBlock
          return (
            <ChatSection
              key={index}
              title={b.title}
              subtitle={b.subtitle}
              whatsappNumber={b.whatsappNumber}
              whatsappIcon={b.whatsappIcon}
            />
          )
        }
        if (block.blockType === 'conceptIconsSection') {
          const b = block as ConceptIconsSectionBlock
          return <ConceptIconsSection key={index} title={b.title} items={b.items} />
        }
        if (block.blockType === 'button') {
          const b = block as ButtonBlock
          return <UniversalButton key={index} block={b} />
        }
        return null
      })}
    </div>
  )
})
