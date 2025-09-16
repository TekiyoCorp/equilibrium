import React from 'react'
import type { Media } from '@/payload-types'
import styles from './TextMediaTiles.module.css'

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
    <section className={styles.root}>
      <div className={styles.grid}>
        {items.slice(0, 3).map((it, idx) => {
          const media = it.image as Media | number | undefined
          const mediaObj = typeof media === 'object' ? (media as Media) : undefined
          const placeBottom = (it.imagePlacement || 'bottom') === 'bottom'
          const align = it.imageAlign || 'center'
          return (
            <article className={styles.card} key={`tmt-${idx}`}>
              {!placeBottom && mediaObj?.url && (
                <div
                  className={`${styles.image} ${
                    align === 'left'
                      ? styles.imageLeft
                      : align === 'right'
                        ? styles.imageRight
                        : styles.imageCenter
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={mediaObj.alt || ''} src={mediaObj.url} />
                </div>
              )}
              <div className={styles.text}>
                <p>
                  {it.lead && <strong>{it.lead} </strong>}
                  {it.body}
                </p>
              </div>
              {placeBottom && mediaObj?.url && (
                <div
                  className={`${styles.image} ${
                    align === 'left'
                      ? styles.imageLeft
                      : align === 'right'
                        ? styles.imageRight
                        : styles.imageCenter
                  }`}
                >
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
