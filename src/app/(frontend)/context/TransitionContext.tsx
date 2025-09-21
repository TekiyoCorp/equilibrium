'use client'

import React, { createContext, useContext, useState } from 'react'
import { flushSync } from 'react-dom'

type TransitionContextType = {
  startTransition: () => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = () => {
    // Force le re-render immédiat avec flushSync pour affichage instantané
    flushSync(() => {
      setIsTransitioning(true)
    })

    // Auto-stop après 1s au cas où
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider')
  }
  return context
}
