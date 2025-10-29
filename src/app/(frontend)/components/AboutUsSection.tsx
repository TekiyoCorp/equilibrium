'use client'

import React from 'react'
import type { Media } from '@/payload-types'
import { transformMediaUrl } from '@/lib/media-utils'
import styles from './AboutUsSection.module.css'
import FadeIn from '@/app/animation/fade-in'

type AboutUsItem = {
  title: string
  content: any // richText from Payload
  image: number | Media | null
  imagePosition: 'left' | 'right'
}

type AboutUsSectionProps = {
  items?: AboutUsItem[]
  sectionId?: string
}

// Helper function to render richText as HTML
const renderRichText = (content: any): string => {
  if (!content) return ''
  if (typeof content === 'string') return content
  
  // Handle Lexical format
  if (content.root?.children) {
    const renderNode = (node: any): string => {
      if (!node) return ''
      
      const children = node.children ? node.children.map(renderNode).join('') : ''
      
      // Handle text nodes
      if (node.text) {
        return node.text
      }
      
      // Handle different node types
      switch (node.type) {
        case 'heading':
          const tag = node.tag || 'h2'
          return `<${tag}>${children}</${tag}>`
        case 'paragraph':
          return `<p>${children}</p>`
        case 'list':
          const listTag = node.listType === 'number' ? 'ol' : 'ul'
          return `<${listTag}>${children}</${listTag}>`
        case 'listitem':
          return `<li>${children}</li>`
        default:
          return children
      }
    }
    
    return content.root.children.map(renderNode).join('')
  }
  
  return ''
}

export function AboutUsSection({ items = [], sectionId }: AboutUsSectionProps) {
  const getMediaObj = (media: Media | number | null | undefined) => {
    return typeof media === 'object' ? (media as Media) : undefined
  }

  return (
    <section className={styles.root} id={sectionId}>
      <div className={styles.container}>
        {items.map((item, index) => {
          const mediaObj = getMediaObj(item.image)
          const isImageLeft = item.imagePosition === 'left'
          const itemClassName = isImageLeft ? styles.imageLeft : styles.imageRight
          
          return (
            <div key={index} className={`${styles.item} ${itemClassName}`}>
              {/* Image */}
              {mediaObj?.url && (
                <FadeIn from={isImageLeft ? "left" : "right"} duration={0.5} delay={index * 0.2}>
                  <div className={styles.imageWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={mediaObj.alt || item.title}
                      src={transformMediaUrl(mediaObj.url) as string}
                      className={styles.image}
                    />
                  </div>
                </FadeIn>
              )}

              {/* Text content */}
              <FadeIn from={isImageLeft ? "right" : "left"} duration={0.5} delay={index * 0.2 + 0.1}>
                <div className={styles.contentWrapper}>
                  {item.title && <h2 className={styles.title}>{item.title}</h2>}
                  {item.content && (
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: renderRichText(item.content) }}
                    />
                  )}
                </div>
              </FadeIn>
            </div>
          )
        })}
      </div>
    </section>
  )
}

