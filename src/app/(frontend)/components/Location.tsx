'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { Media } from '@/payload-types'
import styles from './Location.module.css'
import FadeIn from '@/app/animation/fade-in'

// Dynamically import Map component to prevent SSR issues
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className={styles.mapPlaceholder}>
      <p>Chargement de la carte...</p>
    </div>
  ),
})

type LocationData = {
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  schedule: {
    weekdays: string
    weekends: string
  }
  isHighlighted?: boolean
}

type LocationProps = {
  locations?: LocationData[]
  mapPlaceholder?: string | null
  whatsappText?: string | null
  whatsappIcon?: Media | number | null
}

export function Location({
  locations = [],
  mapPlaceholder = '<Map>',
  whatsappText = 'Whatsapp Business',
  whatsappIcon,
}: LocationProps) {
  // Données de test par défaut si aucune location n'est fournie
  const defaultLocations: LocationData[] = [
    {
      name: 'Dubaï 1',
      address: '12 Rue Lorem Ipsum',
      coordinates: {
        lat: 25.2048,
        lng: 55.2708,
      },
      schedule: {
        weekdays: 'Monday - Friday 5:30 - 22h30',
        weekends: 'Saturday - Sunday 8:00 - 20h00',
      },
      isHighlighted: true,
    },
    {
      name: 'Dubaï 2',
      address: '15 Avenue Example',
      coordinates: {
        lat: 25.2148,
        lng: 55.2808,
      },
      schedule: {
        weekdays: 'Monday - Friday 6:00 - 23h00',
        weekends: 'Saturday - Sunday 9:00 - 21h00',
      },
      isHighlighted: false,
    },
  ]

  // Utiliser les données par défaut si aucune location n'est fournie
  const displayLocations = locations.length > 0 ? locations : defaultLocations
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getMediaObj = (media: Media | number | null | undefined) => {
    return typeof media === 'object' ? (media as Media) : undefined
  }

  const whatsappIconObj = getMediaObj(whatsappIcon)

  // Calculate map center based on locations or use default
  const mapCenter: [number, number] =
    displayLocations.length > 0 && displayLocations[0].coordinates
      ? [displayLocations[0].coordinates.lat, displayLocations[0].coordinates.lng]
      : [25.2048, 55.2708] // Dubai coordinates as default

  // Transform locations for the map component, filter out locations without coordinates
  const mapLocations = displayLocations
    .filter((location) => location.coordinates)
    .map((location) => ({
      name: location.name,
      address: location.address,
      coordinates: [location.coordinates.lat, location.coordinates.lng] as [number, number],
      schedule: location.schedule,
    }))

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.locationsList}>
          {displayLocations.map((location, index) => (
            <FadeIn key={index} from="left" duration={0.6} delay={index * 0.1}>
              <div
                className={`${styles.locationCard} ${location.isHighlighted ? styles.highlighted : ''}`}
              >
                <div className={styles.locationHeader}>
                  <h3 className={styles.locationName}>{location.name}</h3>
                </div>
                <div className={styles.locationAddress}>
                  <p>{location.address}</p>
                </div>
                <div className={styles.locationSchedule}>
                  <p className={styles.scheduleLabel}>Horaire :</p>
                  <p className={styles.scheduleText}>{location.schedule.weekdays}</p>
                  <p className={styles.scheduleText}>{location.schedule.weekends}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            {isClient ? (
              <Map center={mapCenter} zoom={13} locations={mapLocations} />
            ) : (
              <div className={styles.mapPlaceholder}>
                <p>{mapPlaceholder}</p>
              </div>
            )}
          </div>

          <div className={styles.whatsappButton}>
            <span className={styles.whatsappText}>{whatsappText}</span>
            {whatsappIconObj?.url && (
              <div className={styles.whatsappIcon}>
                <img
                  src={whatsappIconObj.url}
                  alt={whatsappIconObj.alt || 'WhatsApp icon'}
                  className={styles.iconImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
