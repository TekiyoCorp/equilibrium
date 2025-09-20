'use client'

import React, { createContext, useContext, useState } from 'react'

type TransitionContextType = {
  startTransition: () => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = () => {
    setIsTransitioning(true)
    // Auto-stop après 1.2s au cas où
    setTimeout(() => setIsTransitioning(false), 1200)
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
