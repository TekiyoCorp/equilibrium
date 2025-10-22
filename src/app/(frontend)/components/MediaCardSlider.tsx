'use client'

import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import type { Media } from '@/payload-types'
import styles from './MediaCardSlider.module.css'

type MediaCardItem = {
  image: number | Media
  text?: string | null
}

type MediaCardSliderProps = {
  items: MediaCardItem[]
  title?: string
}

export function MediaCardSlider({ items, title }: MediaCardSliderProps) {
  console.log('MediaCardSlider - title:', title)
  console.log('MediaCardSlider - items:', items)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className={styles.sectionFullBleed}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <PhotoProvider>
          <div className={styles.sliderWrapper}>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.emblaContainer}>
                {items?.map((item, idx) => {
                  const media = item.image
                  const mediaObj = typeof media === 'object' ? (media as Media) : undefined
                  return (
                    <div
                      className={styles.emblaSlide}
                      key={`slide-${idx}-${mediaObj?.id ?? 'no-id'}`}
                    >
                      <div className={styles.mediaCard}>
                        {mediaObj?.url && (
                          <div className={styles.imageWrap}>
                            <PhotoView src={mediaObj.url}>
                              <Image
                                alt={mediaObj.alt || ''}
                                src={mediaObj.url}
                                width={287}
                                height={348}
                                className={styles.cardImage}
                              />
                            </PhotoView>
                          </div>
                        )}
                        {item.text && (
                          <div className={styles.cardTextWrap}>
                            <p className={styles.cardText}>
                              <span className={styles.cardTextBold}>{item.text}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={styles.navigation}>
              <button
                className={styles.navButton}
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Previous slide"
              >
                <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
                  <path
                    d="M10 1L2 7.5L10 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={styles.navButton}
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Next slide"
              >
                <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
                  <path
                    d="M1 14L9 7.5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </PhotoProvider>
      </div>
    </section>
  )
}
