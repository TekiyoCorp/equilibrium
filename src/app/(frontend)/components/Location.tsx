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
  sectionId?: string
}

export function Location({
  locations = [],
  mapPlaceholder = '<Map>',
  whatsappText = 'Whatsapp Business',
  whatsappIcon,
  sectionId,
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
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getMediaObj = (media: Media | number | null | undefined) => {
    return typeof media === 'object' ? (media as Media) : undefined
  }

  const _whatsappIconObj = getMediaObj(whatsappIcon)

  // Calculate map center based on selected location or default
  const mapCenter: [number, number] = (() => {
    if (selectedLocationIndex !== null && displayLocations[selectedLocationIndex]?.coordinates) {
      const selected = displayLocations[selectedLocationIndex]
      return [selected.coordinates.lat, selected.coordinates.lng]
    }
    return displayLocations.length > 0 && displayLocations[0].coordinates
      ? [displayLocations[0].coordinates.lat, displayLocations[0].coordinates.lng]
      : [25.2048, 55.2708] // Dubai coordinates as default
  })()

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
    <section className={styles.root} id={sectionId}>
      <div className={styles.container}>
        <div className={styles.locationsList}>
          {displayLocations.map((location, index) => (
            <FadeIn key={index} from="bottom" duration={0.3} delay={index * 0.1}>
              <div
                className={`${styles.locationCard} ${location.isHighlighted ? styles.highlighted : ''} ${
                  selectedLocationIndex === index ? styles.selected : ''
                }`}
                onClick={() => setSelectedLocationIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.locationHeader}>
                  <h3 className={styles.locationName}>{location.name}</h3>
                </div>
                <div className={styles.locationAddress}>
                  <p>{location.address}</p>
                </div>
                <div className={styles.locationSchedule}>
                  <p className={styles.scheduleLabel}>Opening times :</p>
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
            <div className={styles.whatsappIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.820312 19.0003L2.09822 14.3318C1.30966 12.9653 0.895305 11.4162 0.896063 9.82774C0.898335 4.86157 4.9396 0.820312 9.90501 0.820312C12.3146 0.82107 14.5765 1.75961 16.2779 3.46247C17.9785 5.16533 18.9147 7.42874 18.914 9.83608C18.9117 14.803 14.8704 18.8443 9.90501 18.8443C8.39759 18.8435 6.91213 18.4655 5.59635 17.7474L0.820312 19.0003ZM5.81754 16.1165C7.08711 16.8702 8.29911 17.3217 9.90198 17.3224C14.0288 17.3224 17.3906 13.9637 17.3929 9.83456C17.3944 5.6971 14.0485 2.34289 9.90804 2.34137C5.77815 2.34137 2.41864 5.70013 2.41712 9.8285C2.41637 11.5139 2.91026 12.7759 3.73972 14.0963L2.98298 16.8596L5.81754 16.1165ZM14.4432 11.9775C14.3871 11.8836 14.2372 11.8275 14.0114 11.7147C13.7864 11.6018 12.6797 11.0572 12.4729 10.9822C12.2669 10.9072 12.1169 10.8693 11.9662 11.095C11.8162 11.32 11.3844 11.8275 11.2534 11.9775C11.1223 12.1275 10.9905 12.1465 10.7655 12.0336C10.5406 11.9207 9.81487 11.6836 8.95511 10.9163C8.28623 10.3194 7.83401 9.58231 7.70296 9.35658C7.57191 9.1316 7.68932 9.00965 7.80143 8.89754C7.90294 8.79679 8.02641 8.63468 8.13928 8.50288C8.25366 8.37259 8.29078 8.27866 8.36653 8.12792C8.44152 7.97793 8.40441 7.84613 8.34759 7.73326C8.29078 7.62115 7.84083 6.51293 7.65372 6.06221C7.47041 5.62362 7.28482 5.6827 7.14696 5.67589L6.71518 5.66831C6.56519 5.66831 6.32128 5.72437 6.11524 5.9501C5.9092 6.17584 5.32744 6.71972 5.32744 7.82795C5.32744 8.93617 6.13418 10.0065 6.24629 10.1565C6.35915 10.3065 7.83325 12.5805 10.0914 13.5554C10.6284 13.7872 11.0481 13.9258 11.3746 14.0296C11.9139 14.2008 12.4048 14.1766 12.7926 14.119C13.2251 14.0546 14.1243 13.5743 14.3122 13.0486C14.5 12.5222 14.5 12.0715 14.4432 11.9775Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
