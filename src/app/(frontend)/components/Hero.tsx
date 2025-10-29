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
        <div className={styles.heroContent}>
          <FadeIn from="bottom" duration={0.6}>
            {b.heading && <h1>{b.heading}</h1>}
          </FadeIn>
          <FadeIn from="bottom" duration={0.6} delay={0.2}>
            {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
          </FadeIn>
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
              {b.appStoreLink && (
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
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0508 22.0449C16.6195 22.3975 16.1235 22.5739 15.5627 22.5739C14.9456 22.5739 14.3988 22.4302 13.9225 22.1426C13.4462 21.8551 13.0513 21.4597 12.7381 20.9564L12.2086 20.0616C11.9563 19.6429 11.7076 19.4187 11.4625 19.389C11.2174 19.3593 10.9252 19.501 10.5859 19.8136L10.0244 20.2942C9.58468 20.6599 9.06324 20.8426 8.46011 20.8426C7.81061 20.8426 7.22354 20.6621 6.69888 20.3013C6.17423 19.9405 5.76559 19.4656 5.47298 18.8765C5.1873 18.2905 5.04446 17.6307 5.04446 16.8971C5.04446 16.3564 5.10012 15.8671 5.21143 15.4293H5.2348L5.62122 15.1829C5.70237 15.1366 5.78102 15.0892 5.85716 15.0407L19.6183 8.93651C19.6688 8.93755 19.7193 8.93858 19.7699 8.93962C19.8367 8.94065 19.9037 8.94169 19.9707 8.94273C20.1019 8.94481 20.2269 8.94481 20.3456 8.94273C20.4643 8.94065 20.5743 8.93755 20.6753 8.93341C20.7158 8.93136 20.7552 8.92827 20.7934 8.92414C20.8317 8.92001 20.8688 8.91585 20.9049 8.91064C20.9493 8.90435 20.9903 8.89699 21.028 8.88857C21.0681 8.88015 21.1058 8.87175 21.1412 8.86337C21.2159 8.84512 21.2829 8.82689 21.3421 8.80868C21.5102 8.76245 21.6255 8.70066 21.6883 8.62332C21.7511 8.54598 21.7825 8.44742 21.7825 8.32764C21.7825 8.23141 21.7653 8.15151 21.7308 8.08795C21.6963 8.02438 21.6469 7.98019 21.5824 7.95538C21.567 7.95035 21.5505 7.94649 21.5329 7.94381C21.5152 7.94113 21.4964 7.93946 21.4764 7.93879C21.4565 7.93812 21.4365 7.9384 21.4164 7.93963C21.3522 7.94297 21.291 7.94988 21.2327 7.96037L19.6183 8.93651L19.6183 8.93651Z"
                      fill="black"
                    />
                    <path
                      d="M3.07346 21.1132C2.85789 21.1132 2.66193 21.0311 2.48561 20.8669C2.30928 20.7026 2.22112 20.5087 2.22112 20.2851C2.22112 20.0813 2.30928 19.9003 2.48561 19.7423C2.66193 19.5842 2.85789 19.5052 3.07346 19.5052H3.09797L21.7825 8.32764C21.7877 8.30406 21.7939 8.28736 21.8012 8.27753C21.8086 8.2677 21.817 8.26278 21.8266 8.26278C21.8372 8.26278 21.8453 8.27019 21.851 8.285C21.8566 8.29982 21.8594 8.31242 21.8594 8.32279C21.8594 8.32904 21.858 8.33774 21.8553 8.34888C21.8525 8.36002 21.8486 8.37114 21.8436 8.38223C21.7752 8.54223 21.6713 8.62116 21.5319 8.61902C21.4316 8.62312 21.3265 8.62621 21.2165 8.62829C21.1066 8.63037 21.0277 8.63037 20.98 8.62829L5.2348 15.1829H5.21143C5.10511 15.2271 5.02628 15.2731 4.97496 15.3208C4.92364 15.3686 4.88773 15.4134 4.86722 15.4553L1.69959 18.1977C1.50079 18.3639 1.40138 18.5578 1.40138 18.7794C1.40138 19.0085 1.50079 19.2158 1.69959 19.4013L4.86722 20.2938C5.06304 20.4868 5.25778 20.5833 5.45144 20.5833C5.64511 20.5833 5.83882 20.4868 6.03258 20.2938C6.23223 20.0937 6.33205 19.8926 6.33205 19.6905C6.33205 19.4764 6.23223 19.3135 6.03258 19.2019L3.09797 19.5052C3.00856 19.5052 2.93325 19.4713 2.87203 19.4035C2.81082 19.3357 2.78021 19.2513 2.78021 19.1503C2.78021 19.0461 2.81082 18.9593 2.87203 18.89C2.93325 18.8206 3.00856 18.7855 3.09797 18.7846L3.09797 18.7846H3.07346C2.96537 18.7846 2.86477 18.8203 2.77166 18.8917C2.67855 18.9631 2.632 19.0582 2.632 19.177C2.632 19.3084 2.68441 19.4243 2.78925 19.5245C2.89409 19.6248 3.01614 19.6749 3.1554 19.6749C3.29891 19.6749 3.42047 19.6242 3.52008 19.5227C3.6197 19.4213 3.66951 19.2914 3.66951 19.1332C3.66951 18.9591 3.62026 18.8126 3.52176 18.6939C3.42326 18.5752 3.28949 18.5158 3.12047 18.5158L3.07346 18.5158H3.07346Z"
                      fill="black"
                    />
                  </svg>
                  App Store
                </a>
              )}
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
      </section>
    )
  }

  // overlayFeatureHero removed; now a section rendered via Sections component

  return null
}
