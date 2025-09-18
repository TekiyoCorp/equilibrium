import type { Block } from 'payload'

export const ChatSection: Block = {
  slug: 'chatSection',
  labels: {
    singular: 'Chat Section',
    plural: 'Chat Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Lorem Ipsum ?',
    },
    {
      name: 'messages',
      label: 'Chat Messages',
      type: 'array',
      required: true,
      defaultValue: [
        {
          sender: 'user',
          text: 'Lorem ipsum is dummy text for Tekiyo.',
          senderName: 'You',
        },
        {
          sender: 'equilibrium',
          text: 'Lorem ipsum is dummy text for Tekiyo.',
          senderName: 'Equilibrium',
        },
      ],
      fields: [
        {
          name: 'sender',
          label: 'Sender',
          type: 'select',
          required: true,
          options: [
            {
              label: 'User',
              value: 'user',
            },
            {
              label: 'Equilibrium',
              value: 'equilibrium',
            },
          ],
        },
        {
          name: 'senderName',
          label: 'Sender Name',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          label: 'Message Text',
          type: 'textarea',
          required: true,
        },
      ],
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
    {
      name: 'whatsappUrl',
      label: 'WhatsApp URL',
      type: 'text',
      defaultValue: '#',
    },
  ],
}
