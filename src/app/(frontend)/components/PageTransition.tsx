'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import styles from './PageTransition.module.css'

type PageTransitionProps = {
  children: React.ReactNode
  logo?: {
    url?: string | null
    alt?: string | null
  } | null
}

export function PageTransition({ children, logo }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentChildren, setCurrentChildren] = useState(children)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Skip transition on initial page load
    if (isInitialLoad) {
      setIsInitialLoad(false)
      setCurrentChildren(children)
      return
    }

    // Start transition sequence
    setIsTransitioning(true)

    // Phase 1: Overlay appears (600ms)
    const phase1Timer = setTimeout(() => {
      // Phase 2: Change page content behind overlay
      setCurrentChildren(children)
    }, 600)

    // Phase 3: Remove overlay after content is ready (1200ms total)
    const phase2Timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(phase2Timer)
    }
  }, [pathname, isInitialLoad, children])

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className={styles.skipLink}
        onFocus={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        onBlur={(e) => (e.currentTarget.style.transform = 'translateY(-100%)')}
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="page-transition-overlay"
            className={styles.overlay}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="loading-message"
          >
            <div className={styles.logoContainer}>
              <div id="loading-message" className={styles.visuallyHidden} aria-live="polite">
                Loading page content, please wait
              </div>
              {logo?.url ? (
                <motion.img
                  src={logo.url}
                  alt={logo.alt || 'Equilibrium logo'}
                  className={styles.logo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
              ) : (
                <motion.div
                  className={styles.logoText}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  role="img"
                  aria-label="Equilibrium logo"
                >
                  EQUILIBRIUM
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" tabIndex={-1}>
        {currentChildren}
      </main>
    </>
  )
}
