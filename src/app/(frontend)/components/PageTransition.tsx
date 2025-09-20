'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '../context/TransitionContext'
import styles from './PageTransition.module.css'

type PageTransitionProps = {
  children: React.ReactNode
  logo?: {
    url?: string | null
    alt?: string | null
  } | null
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const { isTransitioning } = useTransition()
  const [currentChildren, setCurrentChildren] = useState(children)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [localTransition, setLocalTransition] = useState(false)

  useEffect(() => {
    // Skip transition on initial page load
    if (isInitialLoad) {
      setIsInitialLoad(false)
      setCurrentChildren(children)
      return
    }

    // Start transition sequence when pathname changes
    setLocalTransition(true)

    // Phase 1: Overlay appears (600ms)
    const phase1Timer = setTimeout(() => {
      // Phase 2: Change page content behind overlay
      setCurrentChildren(children)
    }, 600)

    // Phase 3: Remove overlay after content is ready (1200ms total)
    const phase2Timer = setTimeout(() => {
      setLocalTransition(false)
    }, 1200)

    return () => {
      clearTimeout(phase1Timer)
      clearTimeout(phase2Timer)
    }
  }, [pathname, isInitialLoad, children])

  // Show transition if triggered by context OR by pathname change
  const showTransition = isTransitioning || localTransition

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
        {showTransition && (
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
              <motion.div
                className={styles.logoSvg}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                role="img"
                aria-label="Equilibrium logo"
              >
                <svg width="52" height="42" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0436 3.09033H3.48565L6.10352e-05 0.00390625H13.0436V3.09033ZM6.10352e-05 8.84984H12.5209V11.9363H3.48565L6.10352e-05 8.84984ZM13.0436 20.9921H3.48565L6.10352e-05 17.907H13.0436V20.9921Z" fill="white"/>
                  <path d="M26.0034 18.4374L23.7037 20.9985L15.3831 13.6423L14.6363 12.9663L16.9411 10.4001L21.14 14.1303C21.8573 12.9316 22.1779 11.6916 22.1779 10.3525C22.1779 8.4133 21.4993 6.71879 20.1447 5.27022C18.803 3.8371 17.2192 3.11861 15.3908 3.10187L14.4109 3.09157V0.00515158L15.3844 0V0.00643652H15.3883C16.9836 0.00643652 18.4502 0.301301 19.7855 0.89103C21.1207 1.48076 22.2229 2.26106 23.0908 3.22935C23.9586 4.19892 24.6321 5.3037 25.1098 6.54239C25.5875 7.78237 25.827 9.06097 25.827 10.3808C25.827 12.6792 25.1664 14.6943 23.8106 16.4931L26.0034 18.4361V18.4374Z" fill="white"/>
                  <path d="M19.3979 20.2696C18.1785 20.7499 16.8497 20.9932 15.4204 20.9984L14.4148 20.9945L14.4109 17.9094L15.378 17.9055L15.3805 18.109V17.9223L15.3792 17.9042C15.7951 17.9004 16.1982 17.8605 16.5896 17.7832L19.3992 20.2709L19.3979 20.2696Z" fill="white"/>
                </svg>
              </motion.div>
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
