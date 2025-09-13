'use client'

import Image from 'next/image'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Media } from '@/payload-types'

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
    <section className="section-full-bleed media-card-slider">
      <div className="embla embla--visible-overflow" ref={emblaRef}>
        <div className="embla__container">
          {items?.map((item, idx) => {
            const media = item.image
            const mediaObj = typeof media === 'object' ? (media as Media) : undefined
            return (
              <div className="embla__slide" key={`slide-${idx}-${mediaObj?.id ?? 'no-id'}`}>
                <div className="media-card">
                  {mediaObj?.url && (
                    <div className="image-wrap">
                      <Image alt={mediaObj.alt || ''} src={mediaObj.url} width={640} height={400} />
                    </div>
                  )}
                  {item.text && <p className="card-text">{item.text}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
