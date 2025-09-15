import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'
import { CourseCards } from './CourseCards'

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
        return null
      })}
    </>
  )
}
