import type { Block } from 'payload'

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
      name: 'ctaLabel',
      label: 'Main CTA Label',
      type: 'text',
    },
    {
      name: 'ctaHref',
      label: 'Main CTA URL',
      type: 'text',
    },
  ],
}
