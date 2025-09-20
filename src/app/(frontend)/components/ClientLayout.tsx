'use client'

import React from 'react'
import { PageTransition } from './PageTransition'
import { useHeaderData } from '../hooks/useHeaderData'
import { TransitionProvider } from '../context/TransitionContext'

type ClientLayoutProps = {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { logo } = useHeaderData()

  return (
    <TransitionProvider>
      <PageTransition logo={logo}>{children}</PageTransition>
    </TransitionProvider>
  )
}
