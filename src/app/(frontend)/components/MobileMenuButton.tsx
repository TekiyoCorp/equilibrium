'use client'

import React from 'react'
import styles from './MobileMenuButton.module.css'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  label?: string
}

export function MobileMenuButton({ isOpen, onClick, label = 'Menu' }: MobileMenuButtonProps) {
  return (
    <button
      className={styles.menuToggle}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${isOpen ? 'Fermer' : 'Ouvrir'} le menu de navigation`}
    >
      <span className={styles.menuLabel}>{label}</span>
      <div className={styles.menuBar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  )
}
