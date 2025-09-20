import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: '#ffffff',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: '400',
          color: '#079495',
          margin: '0 0 1rem 0',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#000000',
          margin: '0 0 2rem 0',
        }}
      >
        Page non trouvée
      </h2>
      <p
        style={{
          fontSize: '1rem',
          color: '#666666',
          margin: '0 0 2rem 0',
          maxWidth: '400px',
        }}
      >
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          padding: '12px 24px',
          backgroundColor: '#079495',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '51px',
          fontWeight: '400',
          transition: 'background-color 0.2s ease',
        }}
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
