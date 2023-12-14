import { useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

const Map = ({ mapCenter, isLoaded }) => {
  // const libraries = useMemo(() => ['places'], [])

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false
    }),
    []
  )

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  //   libraries: libraries
  // })

  if (!isLoaded) {
    return (<div>loading...</div>)
  }

  return (
    <GoogleMap 
      options={mapOptions}
      zoom={16}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: '400px', height: '400px' }}
      onLoad={(map) => console.log('Map Loaded', map)}
    >
      <MarkerF
        position={mapCenter}
        onLoad={() => console.log('Marker Loaded')}
      />
    </GoogleMap> 
  )
}

export default Map
