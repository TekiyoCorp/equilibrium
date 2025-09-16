import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
import styles from './Hero.module.css'
import { Button as UniversalButton } from './Button'
import FadeIn from '@/app/animation/fade-in'

type HeroBlock = NonNullable<Page['content']> // placeholder to satisfy types import

type HeroProps = {
  hero?: Array<
    | ({ blockType: 'centerHero' } & {
        heading?: string | null
        subheading?: string | null
        ctaLabel?: string | null
        ctaHref?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
      })
    | ({ blockType: 'rightHero' } & {
        heading?: string | null
        subheading?: string | null
        image?: number | Media | null
        ctaLabel?: string | null
        ctaHref?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
      })
    | ({ blockType: 'contactHero' } & {
        heading?: string | null
        subheading?: string | null
        email?: string | null
        phone?: string | null
        ctaLabel?: string | null
        ctaHref?: string | null
        backgroundImage?: number | Media | null
        background?: 'light' | 'dark' | null
      })
  >
}

export function Hero({ hero }: HeroProps) {
  if (!hero || hero.length === 0) return null
  const block = hero[0]

  const backgroundImage = (block as any).backgroundImage as Media | number | undefined
  const backgroundImageObj =
    typeof backgroundImage === 'object' ? (backgroundImage as Media) : undefined
  const isDarkBackground = (block as any).background === 'dark' || !!backgroundImageObj?.url
  const bgClass = isDarkBackground ? styles.bgDark : styles.bgLight

  if (block.blockType === 'centerHero') {
    const b = block as any
    return (
      <section
        className={`${styles.hero} ${styles.heroCenter} ${bgClass}`}
        style={
          backgroundImageObj?.url
            ? { backgroundImage: `url(${backgroundImageObj.url})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <FadeIn from="bottom" duration={1.5}>
          <div className={styles.heroContent}>
            {b.heading && <h1>{b.heading}</h1>}
            {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
            {Array.isArray(b.link) && b.link[0] && <UniversalButton block={b.link[0]} />}
          </div>
        </FadeIn>
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
        style={
          backgroundImageObj?.url
            ? { backgroundImage: `url(${backgroundImageObj.url})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <div className="copy">
            {b.heading && <h1>{b.heading}</h1>}
            {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
            {Array.isArray(b.link) && b.link[0] && <UniversalButton block={b.link[0]} />}
          </div>
          {mediaObj?.url && (
            <div className={styles.media}>
              <Image
                alt={mediaObj.alt}
                src={mediaObj.url}
                width={640}
                height={400}
                sizes="(min-width: 900px) 40vw, 100vw"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
            </div>
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
        style={
          backgroundImageObj?.url
            ? { backgroundImage: `url(${backgroundImageObj.url})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          {b.heading && <h1>{b.heading}</h1>}
          {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
          <div className={styles.contacts}>
            {b.email && (
              <a href={`mailto:${b.email}`} className="contact">
                {b.email}
              </a>
            )}
            {b.phone && <span className="contact">{b.phone}</span>}
          </div>
          {Array.isArray(b.link) && b.link[0] && <UniversalButton block={b.link[0]} />}
        </div>
      </section>
    )
  }

  // overlayFeatureHero removed; now a section rendered via Sections component

  return null
}
