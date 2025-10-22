'use client'

import React from 'react'
import { Map, Marker, Popup } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

type MapProps = {
  center?: [number, number]
  zoom?: number
  locations?: Array<{
    name: string
    address: string
    coordinates: [number, number]
    schedule: {
      weekdays: string
      weekends: string
    }
  }>
  mapStyle?: string
}

function MapComponent({
  center = [25.2048, 55.2708], // Dubai coordinates as default
  zoom = 13,
  locations = [],
  mapStyle = 'https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/arcgis_hybrid.json'
}: MapProps) {
  const [selectedLocation, setSelectedLocation] = React.useState<number | undefined>(undefined)
  const [isMounted, setIsMounted] = React.useState(false)
  const [mapError, setMapError] = React.useState<string | null>(null)
  const [viewState, setViewState] = React.useState({
    longitude: center[1],
    latitude: center[0],
    zoom: zoom,
  })

  // Ensure component is mounted before rendering map
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update view state when center changes
  React.useEffect(() => {
    if (isMounted) {
      setViewState({
        longitude: center[1],
        latitude: center[0],
        zoom: zoom,
      })
    }
  }, [center, zoom, isMounted])

  // Error boundary for map loading
  const handleMapError = React.useCallback((error: any) => {
    console.error('Map loading error:', error)
    setMapError('Erreur de chargement de la carte')
  }, [])

  if (!isMounted) {
    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        Chargement de la carte...
      </div>
    )
  }

  if (mapError) {
    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          flexDirection: 'column',
        }}
      >
        <p>{mapError}</p>
        <button
          onClick={() => {
            setMapError(null)
            setIsMounted(false)
            setTimeout(() => setIsMounted(true), 100)
          }}
          style={{
            padding: '8px 16px',
            background: '#079495',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Réessayer
        </button>
      </div>
    )
  }

  try {
    return (
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onError={handleMapError}
        style={{ width: '100%', height: '400px' }}
        mapStyle={mapStyle}
        attributionControl={false}
        reuseMaps={true}
      >
        {locations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={location.coordinates[1]}
            latitude={location.coordinates[0]}
            onClick={() => setSelectedLocation(index)}
          >
            <div
              style={{
                background: '#079495',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid white',
                cursor: 'pointer',
              }}
            />
          </Marker>
        ))}

        {selectedLocation !== undefined && locations[selectedLocation] && (
          <Popup
            longitude={locations[selectedLocation].coordinates[1]}
            latitude={locations[selectedLocation].coordinates[0]}
            onClose={() => setSelectedLocation(undefined)}
            closeButton={true}
            closeOnClick={false}
          >
            <div>
              <h3>{locations[selectedLocation].name}</h3>
              <p>{locations[selectedLocation].address}</p>
              <div>
                <strong>Horaire :</strong>
                <br />
                {locations[selectedLocation].schedule.weekdays}
                <br />
                {locations[selectedLocation].schedule.weekends}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    )
  } catch (error) {
    console.error('Map render error:', error)
    return (
      <div
        style={{
          width: '100%',
          height: '400px',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
        }}
      >
        Erreur de rendu de la carte
      </div>
    )
  }
}

export { MapComponent as Map }
export default MapComponent
