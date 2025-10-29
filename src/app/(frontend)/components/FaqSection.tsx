'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FaqSection.module.css'
import type { Media } from '@/payload-types'
import { transformMediaUrl } from '@/lib/media-utils'
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

export const AnimatedFaqBlock: React.FC<AnimatedFaqBlockProps & { sectionId?: string }> = ({
  title,
  faqs,
  largeImage,
  smallImage,
  className,
  sectionId,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const smallMediaMeta = (typeof smallImage === 'object' ? (smallImage as Media) : undefined)
  const initialSmallIsLandscape = !!(smallMediaMeta?.width && smallMediaMeta?.height)
    ? (smallMediaMeta.width as number) > (smallMediaMeta.height as number)
    : false
  const [isSmallLandscape, setIsSmallLandscape] = useState<boolean>(initialSmallIsLandscape)
  
  // Check if any images are present
  const hasImages = (typeof largeImage === 'object' && (largeImage as Media)?.url) || 
                   (typeof smallImage === 'object' && (smallImage as Media)?.url)
  
  // Use different grid class based on image presence
  const gridClass = hasImages ? styles.gridTwoCols : styles.gridFullWidth

  return (
    <section className={`${styles.container} ${className || ''}`} id={sectionId}>
      <FadeIn>
        <div className={styles.inner}>
          <div className={gridClass}>
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
                    src={transformMediaUrl((largeImage as Media).url) as string}
                    alt={(largeImage as Media).alt || ''}
                    className={styles.imageCover}
                  />
                </div>
              )}
            </div>

            {typeof smallImage === 'object' && (smallImage as Media)?.url && (
              <div className={`${styles.smallImageWrap} ${isSmallLandscape ? styles.smallLandscape : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={transformMediaUrl((smallImage as Media).url) as string}
                  alt={(smallImage as Media).alt || ''}
                  className={`${styles.imageCover} ${isSmallLandscape ? styles.imageContain : ''}`}
                  onLoad={(e) => {
                    const img = e.currentTarget
                    if (img.naturalWidth && img.naturalHeight) {
                      setIsSmallLandscape(img.naturalWidth > img.naturalHeight)
                    }
                  }}
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
  sectionId,
}: {
  title?: string | null
  items: Array<{ question: string; answer: string }>
  largeImage?: Media | number | null
  smallImage?: Media | number | null
  sectionId?: string
}) {
  return (
    <AnimatedFaqBlock
      title={title || ''}
      faqs={items}
      largeImage={largeImage || null}
      smallImage={smallImage || null}
      sectionId={sectionId}
    />
  )
}
