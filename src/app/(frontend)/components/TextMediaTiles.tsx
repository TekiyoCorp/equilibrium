import React from 'react'
import type { Media } from '@/payload-types'

type TextMediaTilesProps = {
  items: Array<{
    lead?: string | null
    body?: string | null
    image?: Media | number | null
    imagePlacement?: 'top' | 'bottom' | null
    imageAlign?: 'left' | 'center' | 'right' | null
  }>
}

export function TextMediaTiles({ items }: TextMediaTilesProps) {
  return (
    <section className="text-media-tiles">
      <div className="tmt-grid">
        {items.slice(0, 3).map((it, idx) => {
          const media = it.image as Media | number | undefined
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          const placeBottom = (it.imagePlacement || 'bottom') === 'bottom'
          const align = it.imageAlign || 'center'
          return (
            <article className="tmt-card" key={`tmt-${idx}`}>
              {!placeBottom && mediaObj?.url && (
                <div className={`tmt-image tmt-image--${align}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={mediaObj.alt || ''} src={mediaObj.url} />
                </div>
              )}
              <div className="tmt-text">
                <p>
                  {it.lead && <strong>{it.lead} </strong>}
                  {it.body}
                </p>
              </div>
              {placeBottom && mediaObj?.url && (
                <div className={`tmt-image tmt-image--${align}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={mediaObj.alt || ''} src={mediaObj.url} />
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
