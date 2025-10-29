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
      name: 'whatsappLink',
      label: 'WhatsApp Link',
      type: 'text',
      required: true,
    },
    {
      name: 'appStoreLink',
      label: 'App Store Link',
      type: 'text',
      required: true,
    },
    {
      name: 'googlePlayLink',
      label: 'Google Play Link',
      type: 'text',
      required: true,
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
