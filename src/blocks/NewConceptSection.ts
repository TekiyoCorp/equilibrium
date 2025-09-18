import type { Block } from 'payload'

export const NewConceptSection: Block = {
  slug: 'newConceptSection',
  labels: {
    singular: 'New Concept Section',
    plural: 'New Concept Sections',
  },
  fields: [
    {
      name: 'label',
      label: 'Section Label',
      type: 'text',
      defaultValue: 'Concept',
    },
    {
      name: 'title',
      label: 'Main Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
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
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
  ],
}
