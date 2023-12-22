'use client'

import { useMemo, useState } from 'react'
import { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'


import PlacesAutocomplete from '@/components/autocomplete/index'
import Map from '@/components/map'

import styles from './autocomplete-map.module.scss'

const AutocompleteMap = ({ loaded, onComplete }) => {
  const [lat, setLat] = useState(52.0739930770121)
  const [lng, setLng] = useState(18.740554811748666)
  const [zoom, setZoom] =useState(5)

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng])

  return (
    <>
      {loaded && <PlacesAutocomplete
        onAddressSelect={(address, placeId) => {
          getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0])
            setZoom(15)
            setLat(lat)
            setLng(lng)
          });
          getDetails({placeId}).then((result) => onComplete({
            // result,
            name: result.name,
            address: result.formatted_address,
            contact: result.international_phone_number,
            website: result.website,
            openingHours: result.opening_hours?.periods,
            lat,
            lng,
          }))
        }}
      />}
      <div className={styles.map}>
        <Map mapCenter={mapCenter} isLoaded={loaded} width="100%" height="300px" zoom={zoom} /> 
      </div>

    </>
  )
}

export default AutocompleteMap
