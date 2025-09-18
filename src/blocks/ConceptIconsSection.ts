import type { Block } from 'payload'

export const ConceptIconsSection: Block = {
  slug: 'conceptIconsSection',
  labels: {
    singular: 'Concept Icons Section',
    plural: 'Concept Icons Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Concept',
    },
    {
      name: 'items',
      label: 'Concept Items',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      defaultValue: [{ label: 'Concept' }, { label: 'Concept' }, { label: 'Concept' }],
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          defaultValue: 'Concept',
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'select',
      options: [
        { label: 'White', value: '#ffffff' },
        { label: 'Light Gray', value: '#f8f9fa' },
        { label: 'Custom', value: 'custom' },
      ],
      defaultValue: '#ffffff',
    },
    {
      name: 'customBackgroundColor',
      label: 'Custom Background Color',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundColor === 'custom',
      },
    },
  ],
}
