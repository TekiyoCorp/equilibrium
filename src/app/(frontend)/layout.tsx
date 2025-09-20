import React from 'react'
import './styles.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ClientLayout } from './components/ClientLayout'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Home',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
