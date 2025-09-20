'use client'

import React from 'react'
import type { Media } from '@/payload-types'
import styles from './TextImageBlock.module.css'
import FadeIn from '@/app/animation/fade-in'

type TextImageBlockProps = {
  text?: string | null
  subtitle?: string | null
  image?: Media | number | null
}

export function TextImageBlock({ text, subtitle, image }: TextImageBlockProps) {
  const getMediaObj = (media: Media | number | null | undefined) => {
    return typeof media === 'object' ? (media as Media) : undefined
  }

  const mediaObj = getMediaObj(image)

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <FadeIn from="bottom" duration={0.3}>
          <div className={styles.textSection}>
            {text && (
              <div className={styles.text}>
                <p>{text}</p>
              </div>
            )}
            {subtitle && (
              <div className={styles.subtitleContainer}>
                <p className={styles.subtitle}>{subtitle}</p>
                <div className={styles.arrow}>
                  <svg width="4" height="7" viewBox="0 0 4 7" fill="none">
                    <path
                      d="M0.5 0.5L3.5 3.5L0.5 6.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {mediaObj?.url && (
          <FadeIn from="bottom" duration={0.3} delay={0.2}>
            <div className={styles.imageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={mediaObj.alt || ''} src={mediaObj.url} className={styles.image} />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
