'use client'

import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'
import { Button as UniversalButton } from './Button'
import { motion, AnimatePresence } from 'framer-motion'
import { TransitionLink } from './TransitionLink'
import { MobileMenuButton } from './MobileMenuButton'

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
        {/* Top bar with logo and mobile menu button - only visible on mobile */}
        <div className={styles['topBar']}>
          <Link className={styles['brand']} href="/">
            {logo?.image?.url ? (
              <img
                src={logo.image.url}
                alt={logo.image.alt || logo?.alt || 'Logo'}
                className={styles['brand-image']}
              />
            ) : (
              <span className={styles['brand-text']}>EQUILIBRIUM</span>
            )}
          </Link>
          <MobileMenuButton isOpen={open} onClick={toggle} label="Menu" />
        </div>

        {/* Desktop logo - hidden on mobile */}
        <Link className={styles['brand-desktop']} href="/">
          {logo?.image?.url ? (
            <img
              src={logo.image.url}
              alt={logo.image.alt || logo?.alt || 'Logo'}
              className={styles['brand-image']}
            />
          ) : (
            <span className={styles['brand-text']}>EQUILIBRIUM</span>
          )}
        </Link>

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
                  <TransitionLink
                    href={
                      typeof item.page === 'object' && (item.page as any)?.slug
                        ? `/${(item.page as any).slug}`
                        : '#'
                    }
                    aria-label={item.ariaLabel || item.label}
                  >
                    {item.label}
                  </TransitionLink>
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

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={styles['mobileMenuContent']}
            >
              <nav className={styles['nav']} aria-label="Mobile">
                <ul className={styles['nav-list']}>
                  {navItems.map((item, i) => (
                    <motion.li
                      key={`m-${i}`}
                      className={styles['nav-item']}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.2 }}
                    >
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
                        <TransitionLink
                          href={
                            typeof item.page === 'object' && (item.page as any)?.slug
                              ? `/${(item.page as any).slug}`
                              : '#'
                          }
                          aria-label={item.ariaLabel || item.label}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </TransitionLink>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {ctaBlock && (
                <motion.div
                  className={styles['ctaWrap']}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                >
                  <UniversalButton block={ctaBlock} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
