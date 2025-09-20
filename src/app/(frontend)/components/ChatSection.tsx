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
        <FadeIn from="top" duration={0.3}>
          <h2 className={styles.title}>{title}</h2>
        </FadeIn>

        <div className={styles.chatContainer}>
          {messages.map((message, index) => (
            <FadeIn key={index} from="bottom" duration={0.3} delay={index * 0.2}>
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

        <FadeIn from="bottom" duration={0.3} delay={0.8}>
          <a
            href={whatsappUrl || '#'}
            className={styles.whatsappButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.whatsappText}>{whatsappText}</span>
            <div className={styles.whatsappIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.820312 19.0003L2.09822 14.3318C1.30966 12.9653 0.895305 11.4162 0.896063 9.82774C0.898335 4.86157 4.9396 0.820312 9.90501 0.820312C12.3146 0.82107 14.5765 1.75961 16.2779 3.46247C17.9785 5.16533 18.9147 7.42874 18.914 9.83608C18.9117 14.803 14.8704 18.8443 9.90501 18.8443C8.39759 18.8435 6.91213 18.4655 5.59635 17.7474L0.820312 19.0003ZM5.81754 16.1165C7.08711 16.8702 8.29911 17.3217 9.90198 17.3224C14.0288 17.3224 17.3906 13.9637 17.3929 9.83456C17.3944 5.6971 14.0485 2.34289 9.90804 2.34137C5.77815 2.34137 2.41864 5.70013 2.41712 9.8285C2.41637 11.5139 2.91026 12.7759 3.73972 14.0963L2.98298 16.8596L5.81754 16.1165ZM14.4432 11.9775C14.3871 11.8836 14.2372 11.8275 14.0114 11.7147C13.7864 11.6018 12.6797 11.0572 12.4729 10.9822C12.2669 10.9072 12.1169 10.8693 11.9662 11.095C11.8162 11.32 11.3844 11.8275 11.2534 11.9775C11.1223 12.1275 10.9905 12.1465 10.7655 12.0336C10.5406 11.9207 9.81487 11.6836 8.95511 10.9163C8.28623 10.3194 7.83401 9.58231 7.70296 9.35658C7.57191 9.1316 7.68932 9.00965 7.80143 8.89754C7.90294 8.79679 8.02641 8.63468 8.13928 8.50288C8.25366 8.37259 8.29078 8.27866 8.36653 8.12792C8.44152 7.97793 8.40441 7.84613 8.34759 7.73326C8.29078 7.62115 7.84083 6.51293 7.65372 6.06221C7.47041 5.62362 7.28482 5.6827 7.14696 5.67589L6.71518 5.66831C6.56519 5.66831 6.32128 5.72437 6.11524 5.9501C5.9092 6.17584 5.32744 6.71972 5.32744 7.82795C5.32744 8.93617 6.13418 10.0065 6.24629 10.1565C6.35915 10.3065 7.83325 12.5805 10.0914 13.5554C10.6284 13.7872 11.0481 13.9258 11.3746 14.0296C11.9139 14.2008 12.4048 14.1766 12.7926 14.119C13.2251 14.0546 14.1243 13.5743 14.3122 13.0486C14.5 12.5222 14.5 12.0715 14.4432 11.9775Z"
                  fill="white"
                />
              </svg>
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
