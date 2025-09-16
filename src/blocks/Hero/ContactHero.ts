import type { Block } from 'payload'
import { Link } from '../Link'

export const ContactHero: Block = {
  slug: 'contactHero',
  labels: {
    singular: 'Contact Hero',
    plural: 'Contact Heroes',
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
      name: 'email',
      type: 'email',
    },
    {
      name: 'phone',
      type: 'text',
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
