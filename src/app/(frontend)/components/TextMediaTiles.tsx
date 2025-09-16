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
  const firstItem = items[0]
  const secondItem = items[1]
  const thirdItem = items[2]

  const getMediaObj = (item: (typeof items)[0]) => {
    const media = item?.image as Media | number | undefined
    return typeof media === 'object' ? (media as Media) : undefined
  }

  const firstMedia = getMediaObj(firstItem)
  const secondMedia = getMediaObj(secondItem)
  const thirdMedia = getMediaObj(thirdItem)

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* Grande carte à gauche */}
        {firstItem && (
          <div className={styles.leftCard}>
            {firstMedia?.url && (
              <div className={`${styles.image} ${styles.imageLarge}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={firstMedia.alt || ''} src={firstMedia.url} />
              </div>
            )}
            <div className={styles.text}>
              <p>
                {firstItem.lead && <strong>{firstItem.lead} </strong>}
                <span>{firstItem.body}</span>
              </p>
            </div>
          </div>
        )}

        {/* Colonne de droite avec deux petites cartes */}
        <div className={styles.rightColumn}>
          {secondItem && (
            <div className={styles.rightCard}>
              <div className={`${styles.text} ${styles.textSmall}`}>
                <p>
                  {secondItem.lead && <strong>{secondItem.lead} </strong>}
                  <span>{secondItem.body}</span>
                </p>
              </div>
              {secondMedia?.url && (
                <div className={`${styles.image} ${styles.imageSmall}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={secondMedia.alt || ''} src={secondMedia.url} />
                </div>
              )}
            </div>
          )}

          {thirdItem && (
            <div className={styles.rightCard}>
              <div className={`${styles.text} ${styles.textSmall}`}>
                <p>
                  {thirdItem.lead && <strong>{thirdItem.lead} </strong>}
                  <span>{thirdItem.body}</span>
                </p>
              </div>
              {thirdMedia?.url && (
                <div className={`${styles.image} ${styles.imageSmall}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={thirdMedia.alt || ''} src={thirdMedia.url} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
