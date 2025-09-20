'use client'

import { useEffect, useState } from 'react'
import type { Media } from '@/payload-types'

type HeaderData = {
  logo?: {
    image?: Media | number | null
    alt?: string | null
  } | null
}

export function useHeaderData() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch('/api/globals/header')
        if (response.ok) {
          const data = await response.json()
          setHeaderData(data)
        }
      } catch (error) {
        console.error('Failed to fetch header data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeaderData()
  }, [])

  const logoData = headerData?.logo?.image
  const logoObj = typeof logoData === 'object' ? (logoData as Media) : undefined

  return {
    logo: logoObj
      ? {
          url: logoObj.url,
          alt: headerData?.logo?.alt || logoObj.alt,
        }
      : null,
    isLoading,
  }
}
