import type { Block } from 'payload'

export const Location: Block = {
  slug: 'location',
  labels: {
    singular: 'Location',
    plural: 'Locations',
  },
  fields: [
    {
      name: 'locations',
      label: 'Locations',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          label: 'Location Name',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          required: true,
        },
        {
          name: 'coordinates',
          label: 'Coordinates',
          type: 'group',
          fields: [
            {
              name: 'lat',
              label: 'Latitude',
              type: 'number',
              required: true,
            },
            {
              name: 'lng',
              label: 'Longitude',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'schedule',
          label: 'Schedule',
          type: 'group',
          fields: [
            {
              name: 'weekdays',
              label: 'Weekdays Schedule',
              type: 'text',
              required: true,
            },
            {
              name: 'weekends',
              label: 'Weekends Schedule',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'isHighlighted',
          label: 'Highlighted Location',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'mapPlaceholder',
      label: 'Map Placeholder Text',
      type: 'text',
      defaultValue: '<Map>',
    },
    {
      name: 'whatsappText',
      label: 'WhatsApp Button Text',
      type: 'text',
      defaultValue: 'Whatsapp Business',
    },
    {
      name: 'whatsappIcon',
      label: 'WhatsApp Icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
