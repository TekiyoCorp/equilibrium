import type { Block } from 'payload'

export const MediaCardSlider: Block = {
  slug: 'mediaCardSlider',
  labels: {
    singular: 'Media Card Slider',
    plural: 'Media Card Sliders',
  },
  fields: [
    {
      name: 'items',
      label: 'Cards',
      type: 'array',
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
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
          name: 'text',
          type: 'text',
        },
      ],
    },
  ],
}
