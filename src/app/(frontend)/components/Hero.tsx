'use client'

import Image from 'next/image'
import type { Media } from '@/payload-types'
import { transformMediaUrl } from '@/lib/media-utils'
import styles from './Hero.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'

// type HeroBlock = NonNullable<Page['content']> // placeholder to satisfy types import

type HeroProps = {
  hero?: Array<
    | ({ blockType: 'centerHero' } & {
        heading?: string | null
        subheading?: string | null
        ctaLabel?: string | null
        ctaHref?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
        sectionId?: string | null
        anchor?: string | null
        blockName?: string | null
        id?: string | null
      })
    | ({ blockType: 'rightHero' } & {
        heading?: string | null
        subheading?: string | null
        image?: number | Media | null
        ctaLabel?: string | null
        ctaHref?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
        sectionId?: string | null
        anchor?: string | null
        blockName?: string | null
        id?: string | null
      })
    | ({ blockType: 'contactHero' } & {
        heading?: string | null
        subheading?: string | null
        whatsappLink?: string | null
        appStoreLink?: string | null
        googlePlayLink?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
        sectionId?: string | null
        anchor?: string | null
        blockName?: string | null
        id?: string | null
      })
  >
}

export function Hero({ hero }: HeroProps) {
  console.log('Hero component received:', hero)

  if (!hero || hero.length === 0) {
    console.log('Hero: No hero data or empty array')
    return null
  }

  const block = hero[0]
  console.log('Hero block:', block)

  if (!block) {
    console.log('Hero: Block is null/undefined')
    return null
  }

  const candidates = [block?.sectionId, block?.anchor, block?.blockName, block?.heading, block?.id]
  const heroSectionId = candidates.find((value) => typeof value === 'string' && value.trim())
  const finalSectionId =
    typeof heroSectionId === 'string'
      ? heroSectionId
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-_]/g, '')
          .replace(/[\s_]+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '') || 'hero'
      : 'hero'

  const backgroundImage = (block as any).backgroundImage as Media | number | undefined
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined
  const transformedBackgroundUrl = transformMediaUrl(backgroundImageObj?.url)
  const isDarkBackground = (block as any).background === 'dark' || !!transformedBackgroundUrl
  const bgClass = isDarkBackground ? styles.bgDark : styles.bgLight

  if (block.blockType === 'centerHero') {
    const b = block as any
    return (
      <section
        className={`${styles.hero} ${styles.heroCenter} ${bgClass}`}
        id={finalSectionId}
        style={
          transformedBackgroundUrl
            ? { backgroundImage: `url(${transformedBackgroundUrl})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}

        <div className={styles.heroContent}>
          <FadeIn from="bottom" duration={0.6}>
            {b.heading && <h1>{b.heading}</h1>}
          </FadeIn>
          <FadeIn from="bottom" duration={0.6} delay={0.2}>
            {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
          </FadeIn>
          <FadeIn from="bottom" duration={0.6} delay={0.4}>
            {Array.isArray(b.link) && b.link[0] && <UniversalButton block={b.link[0]} />}
          </FadeIn>
        </div>
      </section>
    )
  }

  if (block.blockType === 'rightHero') {
    const b = block as any
    const media = b.image as Media | number | undefined
    const mediaObj = typeof media === 'object' ? (media as Media) : undefined
    return (
      <section
        className={`${styles.hero} ${styles.heroRight} ${bgClass}`}
        id={finalSectionId}
        style={
          transformedBackgroundUrl
            ? { backgroundImage: `url(${transformedBackgroundUrl})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <FadeIn from="bottom" duration={0.6}>
              {b.heading && <h1>{b.heading}</h1>}
            </FadeIn>
            <FadeIn from="bottom" duration={0.6} delay={0.2}>
              {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
            </FadeIn>
            <FadeIn from="bottom" duration={0.6} delay={0.4}>
              {Array.isArray(b.link) && b.link[0] && (
                <div className={styles.ctaWrap}>
                  <UniversalButton block={b.link[0]} />
                </div>
              )}
            </FadeIn>
          </div>
          {mediaObj?.url && (
            <FadeIn from="bottom" duration={0.6} delay={0.3}>
              <div className={styles.media}>
                <Image
                  alt={mediaObj.alt}
                  src={transformMediaUrl(mediaObj.url) || mediaObj.url || ''}
                  width={640}
                  height={400}
                  sizes="(min-width: 900px) 40vw, 100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    )
  }

  if (block.blockType === 'contactHero') {
    const b = block as any
    return (
      <section
        className={`${styles.hero} ${styles.heroContact} ${bgClass}`}
        id={finalSectionId}
        style={
          transformedBackgroundUrl
            ? { backgroundImage: `url(${transformedBackgroundUrl})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={`${styles.heroContent} ${styles.contactHeroContent}`}>
          <div className={styles.contactRow}>
            <div className={styles.contactLeftCol}>
              <div className={styles.glassPanel}>
                <FadeIn from="bottom" duration={0.6}>
                  {b.heading && <h1>{b.heading}</h1>}
                </FadeIn>
                <FadeIn from="bottom" duration={0.6} delay={0.2}>
                  {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
                </FadeIn>
              </div>
            </div>

            <div className={styles.contactRightCol}>
              <div className={styles.glassPanel}>
                <FadeIn from="bottom" duration={0.6} delay={0.4}>
                  <div className={styles.downloadLinks}>
                    {b.whatsappLink && (
                      <a
                        href={b.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappLink}
                        aria-label="WhatsApp"
                      >
                        <Image
                          src="/images/icons/whatsappSocial.svg"
                          alt="WhatsApp"
                          width={24}
                          height={24}
                        />
                        WhatsApp
                      </a>
                    )}
                    <a
                      href={b.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.appStoreLink}
                      aria-label="Download on App Store"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M16.365 1.43c-.96.056-2.08.68-2.738 1.48-.594.72-1.113 1.84-.916 2.92 1.05.08 2.14-.54 2.794-1.34.63-.76 1.123-1.86.86-3.06zM19.55 13.44c-.053-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.37-2.36-1.86-.19-3.63 1.1-4.57 1.1-.96 0-2.41-1.08-3.97-1.05-2.04.03-3.93 1.2-4.98 3.05-2.12 3.66-.54 9.06 1.52 12.04 1.01 1.46 2.22 3.1 3.79 3.04 1.52-.06 2.09-.98 3.92-.98 1.83 0 2.34.98 3.97.95 1.64-.03 2.69-1.49 3.7-2.96 1.16-1.7 1.64-3.35 1.66-3.44-.04-.02-3.19-1.23-3.2-4.79z"
                          fill="black"
                        />
                      </svg>
                      App Store
                    </a>
                    {b.googlePlayLink && (
                      <a
                        href={b.googlePlayLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.googlePlayLink}
                        aria-label="Get it on Google Play"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
                            fill="black"
                          />
                        </svg>
                        Google Play
                      </a>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // overlayFeatureHero removed; now a section rendered via Sections component

  return null
}
