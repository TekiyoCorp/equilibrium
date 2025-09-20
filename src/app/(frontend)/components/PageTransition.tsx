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
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    // Skip transition on initial page load
    if (isInitialLoad) {
      setIsInitialLoad(false)
      return
    }

    // Start transition
    setIsLoading(true)

    // Simulate page loading time and allow animations to settle
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200) // 1.2s total transition time

    return () => clearTimeout(timer)
  }, [pathname, isInitialLoad])

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
        {isLoading && (
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

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0.6 : 0 }}
      >
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </motion.div>
    </>
  )
}
