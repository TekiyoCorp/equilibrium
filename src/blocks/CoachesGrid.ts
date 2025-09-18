import type { Block } from 'payload'
import { Button } from './Button'

export const CoachesGrid: Block = {
  slug: 'coachesGrid',
  labels: {
    singular: 'Coaches Grid',
    plural: 'Coaches Grids',
  },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'background',
          label: 'Background',
          type: 'select',
          defaultValue: 'light',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },
    {
      name: 'items',
      label: 'Courses',
      type: 'array',
      labels: { singular: 'Course', plural: 'Courses' },
      minRows: 0,
      maxRows: 12,
      fields: [
        {
          name: 'image',
          label: 'Course Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'courseName',
          label: 'Course Name',
          type: 'text',
          required: true,
        },
        {
          name: 'instructorName',
          label: 'Instructor Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'ctaLabel',
          label: 'CTA Label',
          type: 'text',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLinkType',
              label: 'CTA Link Type',
              type: 'radio',
              defaultValue: 'url',
              options: [
                { label: 'URL', value: 'url' },
                { label: 'Page', value: 'page' },
              ],
            },
            {
              name: 'href',
              label: 'CTA URL',
              type: 'text',
              admin: {
                condition: (_: any, siblingData: any) => siblingData.ctaLinkType === 'url',
              },
            },
            {
              name: 'page',
              label: 'CTA Page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_: any, siblingData: any) => siblingData.ctaLinkType === 'page',
              },
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
              name: 'ariaLabel',
              label: 'CTA ARIA Label (optional)',
              type: 'text',
            },
          ],
        },
      ],
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
