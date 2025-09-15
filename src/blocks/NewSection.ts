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
      name: 'layout',
      label: 'Layout Type',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'default',
    },
    {
      name: 'items',
      label: 'Content Items',
      type: 'array',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      minRows: 1,
      fields: [
        {
          name: 'type',
          label: 'Item Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Image', value: 'image' },
            { label: 'Card', value: 'card' },
          ],
          defaultValue: 'card',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.type === 'image' || siblingData?.type === 'card',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.type === 'text' || siblingData?.type === 'card',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.type === 'text' || siblingData?.type === 'card',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'group',
          fields: [
            {
              name: 'href',
              label: 'URL',
              type: 'text',
            },
            {
              name: 'label',
              label: 'Link Text',
              type: 'text',
            },
            {
              name: 'openInNewTab',
              label: 'Open in New Tab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
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
