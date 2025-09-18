'use client'
import React from 'react'
import type { Media } from '@/payload-types'
import styles from './ChatSection.module.css'
import FadeIn from '@/app/animation/fade-in'

type ChatMessage = {
  sender: 'user' | 'equilibrium'
  text: string
  senderName: string
}

type ChatSectionProps = {
  title?: string
  messages?: ChatMessage[]
  whatsappText?: string | null
  whatsappIcon?: Media | number | null
  whatsappUrl?: string | null
}

export function ChatSection({
  title = 'Lorem Ipsum ?',
  messages = [
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
  whatsappText = 'Whatsapp Business',
  whatsappIcon,
  whatsappUrl = '#',
}: ChatSectionProps) {
  const getMediaObj = (media: Media | number | null | undefined) => {
    return typeof media === 'object' ? (media as Media) : undefined
  }

  const whatsappIconObj = getMediaObj(whatsappIcon)

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <FadeIn from="top" duration={0.6}>
          <h2 className={styles.title}>{title}</h2>
        </FadeIn>

        <div className={styles.chatContainer}>
          {messages.map((message, index) => (
            <FadeIn key={index} from="left" duration={0.6} delay={index * 0.2}>
              <div className={`${styles.messageContainer} ${styles[message.sender]}`}>
                <div className={styles.senderName}>{message.senderName}</div>
                <div className={`${styles.messageBubble} ${styles[`${message.sender}Bubble`]}`}>
                  <div className={styles.bubbleTail}></div>
                  <div className={styles.messageContent}>
                    <p>{message.text}</p>
                  </div>
                  <div className={styles.bubbleTailEnd}></div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn from="bottom" duration={0.6} delay={0.8}>
          <a
            href={whatsappUrl}
            className={styles.whatsappButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.whatsappText}>{whatsappText}</span>
            {whatsappIconObj?.url && (
              <div className={styles.whatsappIcon}>
                <img
                  src={whatsappIconObj.url}
                  alt={whatsappIconObj.alt || 'WhatsApp icon'}
                  className={styles.iconImage}
                />
              </div>
            )}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
