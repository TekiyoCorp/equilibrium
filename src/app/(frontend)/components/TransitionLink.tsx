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
  [key: string]: any
}

export function TransitionLink({ 
  href, 
  children, 
  onClick, 
  ...props 
}: TransitionLinkProps) {
  const { startTransition } = useTransition()

  const handleClick = (e: React.MouseEvent) => {
    // Si c'est un lien externe, ne pas déclencher la transition
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
      onClick?.()
      return
    }

    // Si c'est un lien interne, déclencher la transition
    startTransition()
    onClick?.()
  }

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}
