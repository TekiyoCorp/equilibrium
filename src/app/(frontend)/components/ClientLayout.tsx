'use client'

import React from 'react'
import { PageTransition } from './PageTransition'
import { useHeaderData } from '../hooks/useHeaderData'
import { TransitionProvider } from '../context/TransitionContext'

type ClientLayoutProps = {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <TransitionProvider>
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
    </TransitionProvider>
  )
}

function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { logo } = useHeaderData()

  return <PageTransition logo={logo}>{children}</PageTransition>
}
