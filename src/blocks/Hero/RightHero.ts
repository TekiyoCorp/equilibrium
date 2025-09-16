import type { Block } from 'payload'
import { Link } from '../Link'

export const RightHero: Block = {
  slug: 'rightHero',
  labels: {
    singular: 'Right Hero',
    plural: 'Right Heroes',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
