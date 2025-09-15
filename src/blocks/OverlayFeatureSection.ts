import type { Block } from 'payload'

export const OverlayFeatureSection: Block = {
  slug: 'overlayFeatureSection',
  labels: {
    singular: 'Overlay Feature Section',
    plural: 'Overlay Feature Sections',
  },
  fields: [
    {
      name: 'overlayWord',
      label: 'Overlay Word',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
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
    {
      name: 'items',
      label: 'Feature Items',
      type: 'array',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
  ],
}
