'use client'

import React from 'react'
import styles from './Button.module.css'
import type { Page } from '@/payload-types'

type PayloadLinkBlock = {
  label: string
  linkType?: 'url' | 'page' | null
  href?: string | null
  page?: number | Page | null
  variant?: 'primary' | 'secondary' | 'ghost' | null
  target?: '_self' | '_blank' | null
  fullWidth?: boolean | null
  ariaLabel?: string | null
}

export type UniversalButtonProps =
  | {
      block: PayloadLinkBlock
      label?: never
      href?: never
      linkType?: never
      page?: never
      variant?: never
      target?: never
      fullWidth?: never
      ariaLabel?: never
    }
  | {
      block?: never
      label: string
      href: string
      linkType?: 'url' | 'page'
      page?: number | Page | null
      variant?: 'primary' | 'secondary' | 'ghost'
      target?: '_self' | '_blank'
      fullWidth?: boolean
      ariaLabel?: string
    }

export function Button(props: UniversalButtonProps) {
  if ('block' in props) {
    const blk = props.block as PayloadLinkBlock
    const label = blk.label
    const linkType = (blk.linkType ?? 'url') as 'url' | 'page'
    const page = blk.page
    const variant = (blk.variant ?? 'primary') as 'primary' | 'secondary' | 'ghost'
    const target = (blk.target ?? '_self') as '_self' | '_blank'
    const fullWidth = Boolean(blk.fullWidth)
    const ariaLabel = blk.ariaLabel ?? undefined
    const href = blk.href ?? undefined

    const className = [styles.btn, styles[variant], fullWidth ? styles.fullWidth : '']
      .filter(Boolean)
      .join(' ')

    let finalHref = href || '#'
    if (linkType === 'page') {
      const pageObj = typeof page === 'object' ? (page as Page) : undefined
      finalHref = pageObj?.slug ? `/${pageObj.slug}` : '#'
    }

    return (
      <a
        className={className}
        href={finalHref}
        target={target}
        aria-label={ariaLabel || label}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            window.location.href = finalHref
          }
        }}
      >
        {label}
      </a>
    )
  }

  const {
    label,
    href,
    linkType = 'url',
    page,
    variant = 'primary',
    target = '_self',
    fullWidth = false,
    ariaLabel,
  } = props

  const className = [styles.btn, styles[variant], fullWidth ? styles.fullWidth : '']
    .filter(Boolean)
    .join(' ')

  let finalHref = href
  if (linkType === 'page') {
    const pageObj = typeof page === 'object' ? (page as Page) : undefined
    finalHref = pageObj?.slug ? `/${pageObj.slug}` : '#'
  }

  return (
    <a
      className={className}
      href={finalHref}
      target={target}
      aria-label={ariaLabel || label}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          window.location.href = finalHref
        }
      }}
    >
      {label}
    </a>
  )
}
