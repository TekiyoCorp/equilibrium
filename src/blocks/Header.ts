import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'group',
      fields: [
        {
          name: 'image',
          label: 'Logo Image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'alt', label: 'Alt Text', type: 'text' },
      ],
    },
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      labels: { singular: 'Nav Item', plural: 'Nav Items' },
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true },
        { name: 'href', label: 'URL', type: 'text', required: true },
        { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'cta',
      label: 'Call To Action',
      type: 'group',
      fields: [
        { name: 'label', label: 'Label', type: 'text' },
        { name: 'href', label: 'URL', type: 'text' },
        { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
