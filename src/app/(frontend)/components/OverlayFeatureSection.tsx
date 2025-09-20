'use client'

import React from 'react'
import type { Media } from '@/payload-types'
import styles from './OverlayFeatureSection.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'

type OverlayFeatureSectionProps = {
  overlayWord?: string | null
  backgroundImage?: Media | number | null
  heading?: string | null
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
  items?: Array<{
    title?: string | null
    description?: string | null
  }>
}

export function OverlayFeatureSection({
  overlayWord,
  backgroundImage,
  heading,
  button,
  items,
}: OverlayFeatureSectionProps) {
  const [imageError, setImageError] = React.useState(false)
  const [_imageLoaded, setImageLoaded] = React.useState(false)

  const bg = backgroundImage as Media | number | undefined
  const bgObj = typeof bg === 'object' && bg !== null ? (bg as Media) : undefined

  console.log('OverlayFeatureSection - backgroundImage:', backgroundImage)
  console.log('OverlayFeatureSection - bgObj:', bgObj)
  console.log('OverlayFeatureSection - bgObj.url:', bgObj?.url)

  // Test de l'image en arrière-plan avec fallback
  React.useEffect(() => {
    if (bgObj?.url) {
      // Convertir URL relative en absolue pour la production
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || ''
      const fullUrl = bgObj.url.startsWith('http') ? bgObj.url : `${baseUrl}${bgObj.url}`
      
      const img = new Image()
      img.onload = () => {
        setImageLoaded(true)
        setImageError(false)
        console.log('✅ OverlayFeatureSection image loaded successfully:', fullUrl)
      }
      img.onerror = () => {
        console.error('❌ OverlayFeatureSection image failed to load:', fullUrl)

        // Essayer avec le proxy en fallback
        const proxyUrl = `/api/media-proxy?url=${encodeURIComponent(fullUrl || '')}`
        const proxyImg = new Image()

        proxyImg.onload = () => {
          setImageLoaded(true)
          setImageError(false)
          console.log('✅ OverlayFeatureSection image loaded via proxy:', proxyUrl)
        }
        proxyImg.onerror = () => {
          setImageError(true)
          setImageLoaded(false)
          console.error('❌ OverlayFeatureSection proxy also failed:', proxyUrl)
        }
        proxyImg.src = proxyUrl
      }
      img.src = fullUrl
    }
  }, [bgObj?.url])

  // Fallback amélioré pour image manquante
  const getImageUrl = () => {
    if (!bgObj?.url || imageError) return null

    // Si l'image originale a échoué, essayer le proxy
    if (imageError) {
      return `/api/media-proxy?url=${encodeURIComponent(bgObj.url || '')}`
    }

    // Convertir URL relative en absolue pour la production
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || ''
    const fullUrl = bgObj.url.startsWith('http') ? bgObj.url : `${baseUrl}${bgObj.url}`
    
    return fullUrl
  }

  const imageUrl = getImageUrl()
  const backgroundStyle = imageUrl
    ? {
        backgroundImage: `url("${imageUrl}")`,
        backgroundColor: 'transparent', // Pas de couleur en fallback
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {
        backgroundColor: 'transparent', // Pas de background par défaut
      }

  console.log('🎨 OverlayFeatureSection - Final imageUrl:', imageUrl)
  console.log('🎨 OverlayFeatureSection - Final backgroundStyle:', backgroundStyle)
  console.log('🎨 OverlayFeatureSection - imageError:', imageError)

  return (
    <section className={styles.root} style={backgroundStyle}>
      {overlayWord && (
        <div className={styles.overlayWord} aria-hidden>
          {overlayWord}
        </div>
      )}
      <div className={styles.overlayContent}>
        <div className={styles.headerRow}>
          <FadeIn from="bottom" duration={0.2}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
          </FadeIn>
          <FadeIn from="bottom" duration={0.2} delay={0.1}>
            {Array.isArray(button) && button[0] && (
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
            )}
          </FadeIn>
        </div>

        <FadeIn from="bottom" duration={0.3} delay={0.15}>
          <div className={styles.separator} />
        </FadeIn>

        <div className={styles.features}>
          {(items || []).slice(0, 3).map((it, idx) => (
            <FadeIn key={`ofh-${idx}`} from="bottom" duration={0.3} delay={0.2 + idx * 0.1}>
              <div>
                {it.title && <div className={styles.featureTitle}>{it.title}</div>}
                {it.description && <div className={styles.featureDesc}>{it.description}</div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className={styles.heroOverlay} />
    </section>
  )
}
