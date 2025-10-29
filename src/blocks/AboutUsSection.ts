import type { Block } from 'payload'

export const AboutUsSection: Block = {
  slug: 'aboutUsSection',
  labels: {
    singular: 'About Us Section',
    plural: 'About Us Sections',
  },
  fields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imagePosition',
          label: 'Image Position',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          required: true,
        },
      ],
    },
  ],
}

