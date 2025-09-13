import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

type HeroBlock = NonNullable<Page['content']> // placeholder to satisfy types import

type HeroProps = {
  hero?: Array<
    | ({ blockType: 'centerHero' } & {
        heading?: string | null
        subheading?: string | null
        ctaLabel?: string | null
        ctaHref?: string | null
        background?: 'light' | 'dark' | null
      })
    | ({ blockType: 'rightHero' } & {
        heading?: string | null
        subheading?: string | null
        image?: number | Media | null
        ctaLabel?: string | null
        ctaHref?: string | null
        background?: 'light' | 'dark' | null
      })
    | ({ blockType: 'contactHero' } & {
        heading?: string | null
        subheading?: string | null
        email?: string | null
        phone?: string | null
        ctaLabel?: string | null
        ctaHref?: string | null
        background?: 'light' | 'dark' | null
      })
  >
}

export function Hero({ hero }: HeroProps) {
  if (!hero || hero.length === 0) return null
  const block = hero[0]

  const bgClass = (block as any).background === 'dark' ? 'bg-dark' : 'bg-light'

  if (block.blockType === 'centerHero') {
    const b = block as any
    return (
      <section className={`hero hero-center ${bgClass}`}>
        {b.heading && <h1>{b.heading}</h1>}
        {b.subheading && <p className="sub">{b.subheading}</p>}
        {b.ctaHref && b.ctaLabel && (
          <a className="btn" href={b.ctaHref}>
            {b.ctaLabel}
          </a>
        )}
      </section>
    )
  }

  if (block.blockType === 'rightHero') {
    const b = block as any
    const media = b.image as Media | number | undefined
    const mediaObj = typeof media === 'object' ? (media as Media) : undefined
    return (
      <section className={`hero hero-right ${bgClass}`}>
        <div className="copy">
          {b.heading && <h1>{b.heading}</h1>}
          {b.subheading && <p className="sub">{b.subheading}</p>}
          {b.ctaHref && b.ctaLabel && (
            <a className="btn" href={b.ctaHref}>
              {b.ctaLabel}
            </a>
          )}
        </div>
        {mediaObj?.url && (
          <div className="media">
            <Image alt={mediaObj.alt} src={mediaObj.url} width={640} height={400} />
          </div>
        )}
      </section>
    )
  }

  if (block.blockType === 'contactHero') {
    const b = block as any
    return (
      <section className={`hero hero-contact ${bgClass}`}>
        {b.heading && <h1>{b.heading}</h1>}
        {b.subheading && <p className="sub">{b.subheading}</p>}
        <div className="contacts">
          {b.email && (
            <a href={`mailto:${b.email}`} className="contact">
              {b.email}
            </a>
          )}
          {b.phone && <span className="contact">{b.phone}</span>}
        </div>
        {b.ctaHref && b.ctaLabel && (
          <a className="btn" href={b.ctaHref}>
            {b.ctaLabel}
          </a>
        )}
      </section>
    )
  }

  return null
}
