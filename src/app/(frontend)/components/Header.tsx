import React from 'react'
import styles from './Header.module.css'
import { getPayload } from 'payload'
import payloadConfigPromise from '@/payload.config'

type NavItem = { label?: string | null; href?: string | null; newTab?: boolean | null }

type HeaderData = {
  logo?: { image?: { url?: string | null; alt?: string | null } | null; alt?: string | null } | null
  nav?: NavItem[]
  cta?: { label?: string | null; href?: string | null; newTab?: boolean | null } | null
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

  const navItems = data?.nav || []
  const cta = data?.cta
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
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.newTab ? '_blank' : undefined}
                    rel={item.newTab ? 'noreferrer' : undefined}
                  >
                    {item.label || item.href}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {cta?.href && (
          <a
            className={styles['cta']}
            href={cta.href}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noreferrer' : undefined}
          >
            {cta.label || 'Get started'}
          </a>
        )}
      </div>
    </header>
  )
}
