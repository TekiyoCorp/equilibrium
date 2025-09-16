import React from 'react'
import styles from './Header.module.css'
import { getPayload } from 'payload'
import payloadConfigPromise from '@/payload.config'
import { Button as UniversalButton } from './Button'

type LinkBlock = {
  label: string
  linkType?: 'url' | 'page' | null
  href?: string | null
  page?: any
  variant?: 'primary' | 'secondary' | 'ghost' | null
  target?: '_self' | '_blank' | null
  fullWidth?: boolean | null
  ariaLabel?: string | null
  blockType: 'link'
}

type HeaderData = {
  logo?: { image?: { url?: string | null; alt?: string | null } | null; alt?: string | null } | null
  nav?: LinkBlock[] | null
  cta?: LinkBlock[] | null
}

export async function Header() {
  const payloadConfig = await payloadConfigPromise
  const payload = await getPayload({ config: payloadConfig })

  let data: HeaderData | null = null
  try {
    data = (await payload.findGlobal({ slug: 'header', draft: true, depth: 1 })) as HeaderData
  } catch {
    data = null
  }

  const navItems = (data?.nav || []).filter(
    (b): b is LinkBlock => b && (b as any).blockType === 'link',
  )
  const ctaBlock =
    Array.isArray(data?.cta) && data?.cta[0] && (data?.cta[0] as any).blockType === 'link'
      ? (data?.cta[0] as LinkBlock)
      : undefined
  const logo = data?.logo

  return (
    <header className={styles['site-header']} data-node-id="949:1048">
      <div className={styles['container']}>
        <a className={styles['brand']} href="/">
          {logo?.image?.url ? (
            <img
              src={logo.image.url}
              alt={logo.image.alt || logo?.alt || 'Logo'}
              className={styles['brand-image']}
            />
          ) : (
            <span className={styles['brand-text']}>EQUILIBRIUM</span>
          )}
        </a>

        <nav className={styles['nav']} aria-label="Primary">
          <ul className={styles['nav-list']}>
            {navItems.map((item, i) => (
              <li key={i} className={styles['nav-item']}>
                {item.linkType === 'url' ? (
                  <a
                    href={item.href || '#'}
                    target={item.target || undefined}
                    rel={item.target === '_blank' ? 'noreferrer' : undefined}
                    aria-label={item.ariaLabel || item.label}
                  >
                    {item.label || item.href}
                  </a>
                ) : (
                  // For page links, we expect `page` to be populated with the Page object (depth=1)
                  <a
                    href={
                      typeof item.page === 'object' && item.page?.slug ? `/${item.page.slug}` : '#'
                    }
                    aria-label={item.ariaLabel || item.label}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {ctaBlock && <UniversalButton block={ctaBlock} />}
      </div>
    </header>
  )
}
