'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from '../context/TransitionContext'
import { useSmartPrefetch } from '../hooks/useSmartPrefetch'

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
  const router = useRouter()
  const { prefetchPage, cancelPrefetch } = useSmartPrefetch()

  // Utilisation sécurisée du hook avec try/catch
  let startTransition: (() => void) | null = null

  try {
    const transition = useTransition()
    startTransition = transition.startTransition
  } catch (_error) {
    // Si le provider n'est pas disponible, on continue sans transition
    // TransitionProvider not available, using regular navigation
  }

  // Prefetch au hover (seulement pour les liens internes)
  const handleMouseEnter = () => {
    if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      prefetchPage(href, { timeout: 300 }) // Prefetch après 300ms de hover
    }
  }

  const handleMouseLeave = () => {
    if (!href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      cancelPrefetch(href)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // Si c'est un lien externe, ne pas déclencher la transition
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
      onClick?.()
      return
    }

    // Si c'est un lien interne et que le provider est disponible
    if (startTransition) {
      e.preventDefault() // Empêcher la navigation immédiate

      // Déclencher l'overlay INSTANTANÉMENT
      startTransition()

      // Navigation après que l'overlay soit visible
      setTimeout(() => {
        router.push(href)
      }, 50) // 50ms pour que l'overlay soit bien visible
    }

    onClick?.()
  }

  // Si pas de transition disponible, utiliser Link normal avec prefetch
  if (!startTransition) {
    return (
      <Link
        href={href}
        {...props}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        prefetch={false} // On gère le prefetch manuellement
      >
        {children}
      </Link>
    )
  }

  // Sinon, utiliser un bouton avec gestion manuelle de la navigation
  return (
    <button
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
        ...(props.style || {}),
      }}
    >
      {children}
    </button>
  )
}
