'use client'

import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Media } from '@/payload-types'
import styles from './MediaCardSlider.module.css'

type MediaCardItem = {
  image: number | Media
  text?: string | null
}

export function MediaCardSlider({ items }: { items: MediaCardItem[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 4,
  })

  return (
    <section className={styles.sectionFullBleed}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {items?.map((item, idx) => {
            const media = item.image
            const mediaObj = typeof media === 'object' ? (media as Media) : undefined
            return (
              <div className={styles.emblaSlide} key={`slide-${idx}-${mediaObj?.id ?? 'no-id'}`}>
                <div className={styles.mediaCard}>
                  {mediaObj?.url && (
                    <div className={styles.imageWrap}>
                      <Image alt={mediaObj.alt || ''} src={mediaObj.url} width={640} height={400} />
                    </div>
                  )}
                  {item.text && <p className={styles.cardText}>{item.text}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
