import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
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
        style={
          backgroundImageObj?.url
            ? { backgroundImage: `url(${backgroundImageObj.url})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <div className="copy">
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
                  src={mediaObj.url}
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
        style={
          backgroundImageObj?.url
            ? { backgroundImage: `url(${backgroundImageObj.url})` }
            : undefined
        }
      >
        {backgroundImageObj?.url && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <FadeIn from="bottom" duration={0.6}>
                {b.heading && <h1>{b.heading}</h1>}
              </FadeIn>
              <FadeIn from="bottom" duration={0.6} delay={0.2}>
                {b.subheading && <p className={styles.sub}>{b.subheading}</p>}
              </FadeIn>
              <FadeIn from="bottom" duration={0.6} delay={0.4}>
                <div className={styles.contacts}>
                  {b.email && (
                    <a href={`mailto:${b.email}`} className="contact">
                      {b.email}
                    </a>
                  )}
                  {b.phone && <span className="contact">{b.phone}</span>}
                </div>
              </FadeIn>
              <FadeIn from="bottom" duration={0.6} delay={0.6}>
                {Array.isArray(b.link) && b.link[0] && <UniversalButton block={b.link[0]} />}
              </FadeIn>
            </div>

            <FadeIn from="bottom" duration={0.6} delay={0.3}>
              <div
                className={styles.contactForm}
                role="region"
                aria-labelledby="contact-form-title"
              >
                <h2 id="contact-form-title" className={styles.formTitle}>
                  Contact us
                </h2>
                <form className={styles.form} aria-labelledby="contact-form-title">
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.visuallyHidden}>
                      Full Name (required)
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Name"
                      className={styles.formInput}
                      aria-label="Full Name"
                      aria-required="true"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.visuallyHidden}>
                      Email Address (required)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Mail"
                      className={styles.formInput}
                      aria-label="Email Address"
                      aria-required="true"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-phone" className={styles.visuallyHidden}>
                      Phone Number (optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone"
                      className={styles.formInput}
                      aria-label="Phone Number"
                      autoComplete="tel"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-subject" className={styles.visuallyHidden}>
                      Subject or Message (required)
                    </label>
                    <textarea
                      id="contact-subject"
                      placeholder="Subject"
                      className={`${styles.formInput} ${styles.formTextarea}`}
                      rows={4}
                      aria-label="Subject or Message"
                      aria-required="true"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.formButton}
                    aria-describedby="contact-form-title"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    )
  }

  // overlayFeatureHero removed; now a section rendered via Sections component

  return null
}
