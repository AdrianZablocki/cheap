'use client'

import { useMemo, useState } from 'react'
import { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'

import PlacesAutocomplete from '@/components/autocomplete/index'
import Map from '@/components/map'

const AutocompleteMap = ({ loaded }) => {
  const [lat, setLat] = useState(27.672932021393862)
  const [lng, setLng] = useState(85.31184012689732)

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng])

  console.log('autocomplete map comp, `GOOGLE script loaded', loaded)
  return (
    <>
      {loaded && <PlacesAutocomplete
        onAddressSelect={(address, placeId) => {
          getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0])
            setLat(lat)
            setLng(lng)
          });
          getDetails({placeId}).then((result) => {
            console.log('address details', result)
          })
        }}
      />}
      {/* <div style={{height: '300px'}}> */}
        <Map mapCenter={mapCenter} isLoaded={loaded} width="400px" height="400px" zoom={16} />
      {/* </div> */}
      
      <button onClick={() => console.log(lat, lng)}>show lat/lng</button>   
    </>
  )
}

export default AutocompleteMap
