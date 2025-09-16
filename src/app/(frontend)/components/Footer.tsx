import React from 'react'
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
  const legal = data?.legal

  return (
    <footer className="site-footer" data-node-id="949:1010">
      <div className="footer-grid">
        {columns.map((col, idx) => (
          <div className="footer-col" key={idx}>
            {col.title && <h4>{col.title}</h4>}
            <ul>
              {(col.items || []).map((item, i) => {
                if (item.type === 'link' && item.link?.href) {
                  return (
                    <li key={i}>
                      <a
                        href={item.link.href}
                        target={item.link.newTab ? '_blank' : undefined}
                        rel={item.link.newTab ? 'noreferrer' : undefined}
                      >
                        {item.link.label || item.link.href}
                      </a>
                    </li>
                  )
                }
                return <li key={i}>{item.text}</li>
              })}
            </ul>
          </div>
        ))}
        {(legal?.copyright || legal?.byline) && (
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              {legal?.copyright && <li>{legal.copyright}</li>}
              {legal?.byline && <li>{legal.byline}</li>}
            </ul>
          </div>
        )}
      </div>
      <div className="footer-logo-bar">
        <div className="logo-wordmark">
          {logo?.image?.url ? (
            <img
              src={logo.image.url}
              alt={logo.image.alt || 'Logo'}
              className="footer-logo-image"
            />
          ) : (
            'EQUILIBRIUM'
          )}
        </div>
      </div>
    </footer>
  )
}
