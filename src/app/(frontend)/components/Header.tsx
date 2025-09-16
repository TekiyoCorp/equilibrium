import React from 'react'
import styles from './Header.module.css'
import { getPayload } from 'payload'
import payloadConfigPromise from '@/payload.config'
import HeaderClient, { type LinkBlock } from './HeaderClient'

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

  return <HeaderClient logo={logo} navItems={navItems} ctaBlock={ctaBlock} />
}
