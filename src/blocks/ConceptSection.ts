import type { Block } from 'payload'
import { Button } from './Button'

export const ConceptSection: Block = {
  slug: 'conceptSection',
  labels: {
    singular: 'Concept Section',
    plural: 'Concept Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'button',
      label: 'Button',
      type: 'blocks',
      maxRows: 1,
      blocks: [Button],
    },
  ],
}
