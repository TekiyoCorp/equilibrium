import type { Block } from 'payload'

export const FaqSection: Block = {
  slug: 'faqSection',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Questions',
      type: 'array',
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      minRows: 1,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'largeImage',
      label: 'Large Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'smallImage',
      label: 'Small Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
