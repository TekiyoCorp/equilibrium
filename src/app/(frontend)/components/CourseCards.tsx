'use client'

import React, { useState } from 'react'
import { TiPlus } from 'react-icons/ti'
import type { Media } from '@/payload-types'
import styles from './CourseCards.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'
import { motion, AnimatePresence } from 'framer-motion'

type CourseCard = {
  image: number | Media
  eyebrow?: string | null
  heading?: string | null
}

export function CourseCards({
  title,
  items,
  button,
}: {
  title?: string | null
  items: CourseCard[]
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: number | Media | null | any
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
}) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }
  return (
    <section className={styles.courseCards}>
      <FadeIn from="bottom" duration={0.2}>
        {title && <h2 className={styles.courseCardsTitle}>{title}</h2>}
      </FadeIn>

      <div className={styles.courseCardsGrid}>
        {items?.map((item, idx) => {
          const media = item.image
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          return (
            <FadeIn
              key={`course-${idx}-${mediaObj?.id ?? 'no-id'}`}
              from="bottom"
              duration={0.3}
              delay={0.1 + idx * 0.05}
            >
              <article
                className={styles.courseCard}
                style={
                  mediaObj?.url
                    ? {
                        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${mediaObj.url}) lightgray 50% / cover no-repeat`,
                      }
                    : undefined
                }
              >
                <AnimatePresence>
                  {expandedCards.has(idx) && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={styles.expandedOverlay}
                    />
                  )}
                </AnimatePresence>

                <div className={styles.courseCardOverlay}>
                  <AnimatePresence mode="wait">
                    {!expandedCards.has(idx) ? (
                      <motion.div
                        key="original"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.eyebrow && (
                          <span className={styles.courseCardEyebrow}>{item.eyebrow}</span>
                        )}
                        {item.heading && (
                          <h3 className={styles.courseCardHeading}>{item.heading}</h3>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.15 }}
                        className={styles.expandedContent}
                      >
                        <p className={styles.expandedText}>
                          Découvrez nos formations expertes conçues pour développer vos compétences
                          et accélérer votre carrière professionnelle.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    className={`${styles.courseCardIcon} ${expandedCards.has(idx) ? styles.rotated : ''}`}
                    aria-label={expandedCards.has(idx) ? 'Close card' : 'Open card'}
                    onClick={() => toggleCard(idx)}
                    type="button"
                  >
                    <TiPlus style={{ pointerEvents: 'none' }} />
                  </button>
                </div>
              </article>
            </FadeIn>
          )
        })}
      </div>

      {Array.isArray(button) && button[0] && (
        <FadeIn from="bottom" duration={0.3} delay={0.2}>
          <div className={styles.courseCardsCta}>
            <UniversalButton
              label={button[0].label}
              href={button[0].href || '#'}
              linkType={button[0].linkType || 'url'}
              page={button[0].page as any}
              variant={button[0].variant}
              target={button[0].target}
              fullWidth={button[0].fullWidth}
              ariaLabel={button[0].ariaLabel}
            />
          </div>
        </FadeIn>
      )}
    </section>
  )
}
