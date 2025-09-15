import type { CollectionConfig } from 'payload'
import { CenterHero } from '../blocks/Hero/CenterHero'
import { RightHero } from '../blocks/Hero/RightHero'
import { ContactHero } from '../blocks/Hero/ContactHero'
import { MediaCardSlider } from '../blocks/MediaCardSlider'
import { CourseCards } from '../blocks/CourseCards'
import { OverlayFeatureSection } from '../blocks/OverlayFeatureSection'
import { TextMediaTiles } from '../blocks/TextMediaTiles'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    preview: ({ slug }) => `/${slug || ''}`,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      label: 'Hero',
      type: 'blocks',
      maxRows: 1,
      blocks: [CenterHero, RightHero, ContactHero],
    },
    {
      name: 'sections',
      label: 'Sections',
      type: 'blocks',
      blocks: [MediaCardSlider, CourseCards, OverlayFeatureSection, TextMediaTiles],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
