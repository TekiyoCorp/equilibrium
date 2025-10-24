import type { Block } from 'payload'

export const DetailedCourseGrid: Block = {
  slug: 'detailedCourseGrid',
  labels: {
    singular: 'Detailed Course Grid',
    plural: 'Detailed Course Grids',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Cards',
      type: 'array',
      labels: { singular: 'Card', plural: 'Cards' },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          required: true,
        },
        {
          name: 'timeLabel',
          label: 'Time Label',
          type: 'text',
          defaultValue: 'Time',
        },
        {
          name: 'timeValue',
          label: 'Time Value',
          type: 'text',
          defaultValue: '50 minutes',
        },
        {
          name: 'difficulty',
          label: 'Intensity (1-5)',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 3,
        },
        {
          name: 'weekdaySchedule',
          label: 'Text',
          type: 'text',
          defaultValue: 'Monday - Friday 5:30 - 22h30',
        },
      ],
    },
  ],
}
