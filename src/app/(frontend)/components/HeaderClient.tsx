'use client'

import React from 'react'
import styles from './Header.module.css'
import { Button as UniversalButton } from './Button'

export type LinkBlock = {
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

export type HeaderClientProps = {
  logo?: { image?: { url?: string | null; alt?: string | null } | null; alt?: string | null } | null
  navItems: LinkBlock[]
  ctaBlock?: LinkBlock
}

export default function HeaderClient({ logo, navItems, ctaBlock }: HeaderClientProps) {
  const [open, setOpen] = React.useState(false)
  const toggle = React.useCallback(() => setOpen((v) => !v), [])

  React.useEffect(() => {
    const handler = () => setOpen(false)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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

        <button
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className={styles['menuToggle']}
          onClick={toggle}
        >
          <span className={styles['menuBar']} />
          <span className={styles['menuBar']} />
          <span className={styles['menuBar']} />
          <span className={styles['menuLabel']}>Menu</span>
        </button>

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
                  <a
                    href={
                      typeof item.page === 'object' && (item.page as any)?.slug
                        ? `/${(item.page as any).slug}`
                        : '#'
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

        {ctaBlock && (
          <div className={styles['ctaWrap']}>
            <UniversalButton block={ctaBlock} />
          </div>
        )}
      </div>

      <div className={open ? styles['mobileMenuOpen'] : styles['mobileMenuClosed']}>
        <nav aria-label="Mobile">
          <ul className={styles['mobileList']}>
            {navItems.map((item, i) => (
              <li key={`m-${i}`} className={styles['mobileItem']}>
                {item.linkType === 'url' ? (
                  <a
                    href={item.href || '#'}
                    target={item.target || undefined}
                    rel={item.target === '_blank' ? 'noreferrer' : undefined}
                    aria-label={item.ariaLabel || item.label}
                    onClick={() => setOpen(false)}
                  >
                    {item.label || item.href}
                  </a>
                ) : (
                  <a
                    href={
                      typeof item.page === 'object' && (item.page as any)?.slug
                        ? `/${(item.page as any).slug}`
                        : '#'
                    }
                    aria-label={item.ariaLabel || item.label}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            {ctaBlock && (
              <li className={styles['mobileItem']}>
                <UniversalButton block={ctaBlock} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
