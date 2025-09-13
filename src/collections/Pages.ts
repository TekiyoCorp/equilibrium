import type { CollectionConfig } from 'payload'
import { CenterHero } from '../blocks/Hero/CenterHero'
import { RightHero } from '../blocks/Hero/RightHero'
import { ContactHero } from '../blocks/Hero/ContactHero'

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
