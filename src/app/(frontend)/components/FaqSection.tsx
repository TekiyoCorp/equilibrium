'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './FaqSection.module.css'
import type { Media } from '@/payload-types'
import FadeIn from '@/app/animation/fade-in'

export interface AnimatedFaqBlockProps {
  title: string
  faqs: Array<{
    question: string
    answer: string
  }>
  largeImage?: Media | number | null
  smallImage?: Media | number | null
  className?: string
}

export const AnimatedFaqBlock: React.FC<AnimatedFaqBlockProps> = ({
  title,
  faqs,
  largeImage,
  smallImage,
  className,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={`${styles.container} ${className || ''}`}>
      <FadeIn>
        <div className={styles.inner}>
          <div className={styles.gridTwoCols}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.faqList}>
                {faqs.map((faq, idx) => {
                  const isOpen = openIndex === idx
                  return (
                    <div key={idx} className={styles.faqItem}>
                      <button
                        className={`${styles.faqButton} ${isOpen ? styles.faqButtonOpen : ''}`}
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${idx}`}
                      >
                        <span>{faq.question}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          className={styles.plus}
                          transition={{ duration: 0.2 }}
                        >
                          +
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${idx}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={styles.answer}
                          >
                            <p className={styles.answerText}>{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
              {typeof largeImage === 'object' && (largeImage as Media)?.url && (
                <div className={styles.largeImageWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(largeImage as Media).url as string}
                    alt={(largeImage as Media).alt || ''}
                    className={styles.imageCover}
                  />
                </div>
              )}
            </div>

            {typeof smallImage === 'object' && (smallImage as Media)?.url && (
              <div className={styles.smallImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(smallImage as Media).url as string}
                  alt={(smallImage as Media).alt || ''}
                  className={styles.imageCover}
                />
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

// Adapter component expected by Sections
export function FaqSection({
  title,
  items,
  largeImage,
  smallImage,
}: {
  title?: string | null
  items: Array<{ question: string; answer: string }>
  largeImage?: Media | number | null
  smallImage?: Media | number | null
}) {
  return (
    <AnimatedFaqBlock
      title={title || ''}
      faqs={items}
      largeImage={largeImage || null}
      smallImage={smallImage || null}
    />
  )
}
