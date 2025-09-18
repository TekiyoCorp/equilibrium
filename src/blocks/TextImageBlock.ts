import type { Block } from 'payload'

export const TextImageBlock: Block = {
  slug: 'textImageBlock',
  labels: {
    singular: 'Text Image Block',
    plural: 'Text Image Blocks',
  },
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
