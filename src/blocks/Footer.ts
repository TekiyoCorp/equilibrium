import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      label: 'Columns',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Column', plural: 'Columns' },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Item', plural: 'Items' },
          fields: [
            {
              name: 'type',
              label: 'Type',
              type: 'select',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Link', value: 'link' },
              ],
              required: true,
              defaultValue: 'text',
            },
            {
              name: 'text',
              label: 'Text',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.type === 'text' },
            },
            {
              name: 'link',
              label: 'Link',
              type: 'group',
              admin: { condition: (_, siblingData) => siblingData?.type === 'link' },
              fields: [
                { name: 'label', label: 'Label', type: 'text' },
                { name: 'href', label: 'URL', type: 'text' },
                { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'legal',
      label: 'Legal Section',
      type: 'group',
      fields: [
        { name: 'copyright', label: 'Copyright text', type: 'text' },
        { name: 'byline', label: 'Byline', type: 'text' },
      ],
    },
  ],
}
