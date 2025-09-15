import type { Block } from 'payload'

export const CourseCards: Block = {
  slug: 'courseCards',
  labels: {
    singular: 'Course Cards',
    plural: 'Course Cards',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Cards',
      type: 'array',
      labels: { singular: 'Card', plural: 'Cards' },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'ctaLabel',
      label: 'CTA Label',
      type: 'text',
    },
    {
      name: 'ctaHref',
      label: 'CTA Href',
      type: 'text',
    },
  ],
}
