import type { GlobalConfig } from 'payload'
import { Link } from './Link'

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
      type: 'blocks',
      blocks: [Link],
    },
    {
      name: 'cta',
      label: 'Call To Action',
      type: 'blocks',
      maxRows: 1,
      blocks: [Link],
    },
  ],
}
