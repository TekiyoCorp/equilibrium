import type { Block } from 'payload'

export const Link: Block = {
  slug: 'link',
  labels: {
    singular: 'Link',
    plural: 'Links',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'linkType',
          label: 'Link Type',
          type: 'radio',
          defaultValue: 'url',
          options: [
            { label: 'URL', value: 'url' },
            { label: 'Page', value: 'page' },
          ],
        },
        {
          name: 'href',
          label: 'URL',
          type: 'text',
          admin: {
            condition: (_: any, siblingData: any) => siblingData.linkType === 'url',
          },
        },
        {
          name: 'page',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_: any, siblingData: any) => siblingData.linkType === 'page',
          },
        },
      ],
    },
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
    {
      name: 'target',
      label: 'Target',
      type: 'select',
      defaultValue: '_self',
      options: [
        { label: 'Same tab', value: '_self' },
        { label: 'New tab', value: '_blank' },
      ],
    },
    {
      name: 'fullWidth',
      label: 'Full width',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'ariaLabel',
      label: 'ARIA Label (optional)',
      type: 'text',
    },
  ],
}
