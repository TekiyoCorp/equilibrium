import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { Hero } from './components/Hero'
import { Sections } from './components/Sections'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Essayer de récupérer la page "home"
  let homePage = null
  try {
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })
    homePage = result.docs[0] || null
  } catch (error) {
    console.error('Erreur lors de la récupération de la page home:', error)
  }

  // Si la page "home" existe, l'afficher
  if (homePage) {
    console.log('Page home trouvée:', homePage)
    console.log('Hero data:', homePage.hero)
    console.log('Sections data:', homePage.sections)

    return (
      <div className="home-page">
        {homePage.hero && homePage.hero.length > 0 && <Hero hero={homePage.hero as any} />}
        {homePage.sections && homePage.sections.length > 0 && (
          <Sections sections={homePage.sections as any} />
        )}
      </div>
    )
  }

  // Sinon, afficher la page de configuration par défaut
  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
