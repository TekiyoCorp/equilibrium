'use client'

import React from 'react'
import { PageTransition } from './PageTransition'
import { useHeaderData } from '../hooks/useHeaderData'

type ClientLayoutProps = {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { logo } = useHeaderData()

  return <PageTransition logo={logo}>{children}</PageTransition>
}
