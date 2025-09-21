'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

type PrefetchOptions = {
  priority?: 'high' | 'low'
  timeout?: number
}

export function useSmartPrefetch() {
  const router = useRouter()
  const prefetchedUrls = useRef(new Set<string>())
  const prefetchTimeouts = useRef(new Map<string, NodeJS.Timeout>())

  const prefetchPage = useCallback(
    async (href: string, options: PrefetchOptions = {}) => {
      const { timeout = 2000 } = options

      // Éviter les doublons
      if (prefetchedUrls.current.has(href)) {
        return
      }

      // Annuler le timeout précédent si il existe
      const existingTimeout = prefetchTimeouts.current.get(href)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      // Délai avant prefetch (éviter les hovers accidentels)
      const timeoutId = setTimeout(async () => {
        try {
          // Prefetch avec Next.js (utilise le cache HTTP natif)
          await router.prefetch(href)

          // Marquer comme pré-chargé
          prefetchedUrls.current.add(href)

          // Page pré-chargée avec succès
        } catch (_error) {
          // Échec du prefetch (géré silencieusement)
        } finally {
          prefetchTimeouts.current.delete(href)
        }
      }, timeout)

      prefetchTimeouts.current.set(href, timeoutId)
    },
    [router],
  )

  const cancelPrefetch = useCallback((href: string) => {
    const timeoutId = prefetchTimeouts.current.get(href)
    if (timeoutId) {
      clearTimeout(timeoutId)
      prefetchTimeouts.current.delete(href)
    }
  }, [])

  const isPrefetched = useCallback((href: string) => {
    return prefetchedUrls.current.has(href)
  }, [])

  return {
    prefetchPage,
    cancelPrefetch,
    isPrefetched,
  }
}
