import type { Block } from 'payload'

export const NewConceptSection: Block = {
  slug: 'newConceptSection',
  labels: {
    singular: 'New Concept Section',
    plural: 'New Concept Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Main Title',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
