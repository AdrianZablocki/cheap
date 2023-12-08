'use client'

import { useMemo, useState } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import { getGeocode, getLatLng } from 'use-places-autocomplete'

import PlacesAutocomplete from '@/components/autocomplete/index'

const Map = () => {
  const [lat, setLat] = useState(27.672932021393862);
  const [lng, setLng] = useState(85.31184012689732);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      // scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return (<div>loading...</div>)
  }

  return (
    <>
    <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              console.log(lat, lng)
              setLat(lat);
              setLng(lng);
            });
          }}
        />
      <GoogleMap 
        options={mapOptions}
        zoom={18}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '800px', height: '800px' }}
          onLoad={(map) => console.log('Map Loaded')}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log('Marker Loaded')}
        />
      </GoogleMap> 
      <button onClick={() => console.log(lat, lng)}>show lat/jng</button>   
    </>

  )
}

export default Map
