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
  mapStyle = 'https://demotiles.maplibre.org/style.json',
}: MapProps) {
  const [selectedLocation, setSelectedLocation] = React.useState<number | undefined>(undefined)

  return (
    <Map
      initialViewState={{
        longitude: center[1],
        latitude: center[0],
        zoom: zoom,
      }}
      style={{ width: '100%', height: '400px' }}
      mapStyle={mapStyle}
      attributionControl={false}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
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

      {selectedLocation !== undefined && (
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
}

export { MapComponent as Map }
export default MapComponent
