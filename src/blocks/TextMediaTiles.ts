import type { Block } from 'payload'

export const TextMediaTiles: Block = {
  slug: 'textMediaTiles',
  labels: {
    singular: 'Text + Media Tiles',
    plural: 'Text + Media Tiles',
  },
  fields: [
    {
      name: 'items',
      label: 'Tiles',
      type: 'array',
      labels: { singular: 'Tile', plural: 'Tiles' },
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'lead',
          label: 'Lead (bold prefix)',
          type: 'text',
        },
        {
          name: 'body',
          label: 'Body',
          type: 'textarea',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imagePlacement',
          label: 'Image Placement',
          type: 'select',
          defaultValue: 'bottom',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        {
          name: 'imageAlign',
          label: 'Image Align',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  ],
}
