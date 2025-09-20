'use client'

import React from 'react'
import Link from 'next/link'
import { useTransition } from '../context/TransitionContext'

type TransitionLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: () => void
  [key: string]: unknown
}

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  // Utilisation sécurisée du hook avec try/catch
  let startTransition: (() => void) | null = null

  try {
    const transition = useTransition()
    startTransition = transition.startTransition
  } catch (_error) {
    // Si le provider n'est pas disponible, on continue sans transition
    console.warn('TransitionProvider not available, using regular navigation')
  }

  const handleClick = (_e: React.MouseEvent) => {
    // Si c'est un lien externe, ne pas déclencher la transition
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
      onClick?.()
      return
    }

    // Si c'est un lien interne et que le provider est disponible, déclencher la transition
    if (startTransition) {
      startTransition()
    }
    onClick?.()
  }

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}
