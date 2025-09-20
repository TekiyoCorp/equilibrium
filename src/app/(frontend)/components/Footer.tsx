import React from 'react'
import styles from './Footer.module.css'
import { getPayload } from 'payload'
import payloadConfigPromise from '@/payload.config'

type FooterItem = {
  type: 'text' | 'link'
  text?: string | null
  link?: {
    label?: string | null
    href?: string | null
    newTab?: boolean | null
  } | null
}

type FooterColumn = {
  title: string
  items?: FooterItem[]
}

type FooterData = {
  columns?: FooterColumn[]
  logo?: {
    image?: {
      url?: string | null
      alt?: string | null
    } | null
  } | null
  legal?: { copyright?: string | null; byline?: string | null } | null
}

export async function Footer() {
  const payloadConfig = await payloadConfigPromise
  const payload = await getPayload({ config: payloadConfig })

  let data: FooterData | null = null
  try {
    data = (await payload.findGlobal({ slug: 'footer', draft: true, depth: 1 })) as FooterData
  } catch {
    data = null
  }

  const columns = data?.columns || []
  const logo = data?.logo
  const _legal = data?.legal

  return (
    <footer className={styles['site-footer']} data-node-id="949:1010">
      <div className={styles['footer-grid']}>
        {columns.map((col, idx) => (
          <div className={styles['footer-col']} key={idx}>
            {col.title && <h4>{col.title}</h4>}
            <ul>
              {(col.items || []).map((item, i) => {
                if (item.type === 'link' && item.link?.href) {
                  const isTekiyoLink = item.link.label === 'Propulsé par Tekiyo'
                  return (
                    <li key={i}>
                      <a
                        href={isTekiyoLink ? "https://tekiyo.fr" : item.link.href}
                        target={item.link.newTab || isTekiyoLink ? '_blank' : undefined}
                        rel={item.link.newTab || isTekiyoLink ? 'noreferrer' : undefined}
                        className={isTekiyoLink ? styles['tekiyo-link'] : undefined}
                      >
                        {item.link.label || item.link.href}
                        {isTekiyoLink && (
                          <div className={styles['tekiyo-preview']}>
                            <iframe 
                              src="https://tekiyo.fr" 
                              title="Tekiyo Preview"
                              sandbox="allow-same-origin allow-scripts"
                            />
                          </div>
                        )}
                      </a>
                    </li>
                  )
                }
                return <li key={i}>{item.text}</li>
              })}
            </ul>
          </div>
        ))}
        <div className={styles['footer-col']}>
          <h4>Legal</h4>
          <ul>
            <li>© 2025 Equilibrium</li>
            <li>
              <a
                href="https://tekiyo.fr"
                target="_blank"
                rel="noreferrer"
                className={styles['tekiyo-link']}
              >
                Propulsé par Tekiyo
                <div className={styles['tekiyo-preview']}>
                  <iframe 
                    src="https://tekiyo.fr" 
                    title="Tekiyo Preview"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['footer-logo-bar']}>
        <div className={styles['logo-wordmark']}>
          {logo?.image?.url ? (
            <img
              src={logo.image.url}
              alt={logo.image.alt || 'Logo'}
              className={styles['footer-logo-image']}
            />
          ) : (
            'EQUILIBRIUM'
          )}
        </div>
      </div>
    </footer>
  )
}
