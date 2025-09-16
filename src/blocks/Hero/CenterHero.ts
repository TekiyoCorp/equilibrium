import type { Block } from 'payload'
import { Link } from '../Link'

export const CenterHero: Block = {
  slug: 'centerHero',
  labels: {
    singular: 'Center Hero',
    plural: 'Center Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'link',
      label: 'Link',
      type: 'blocks',
      maxRows: 1,
      blocks: [Link],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
