import React from 'react'
import { MediaCardSlider } from './MediaCardSlider'

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
        return null
      })}
    </>
  )
}
