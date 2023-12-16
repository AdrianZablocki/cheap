import { useMemo } from 'react'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import Spinner from '../layout/spinner'

import styles from './map.module.scss'

const Map = ({ 
  mapCenter, 
  isLoaded, 
  // width, 
  // height, 
  zoom 
}) => {
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
    return (<div className={styles.spinnerWrapper}><Spinner isOpen={true}/></div>)
  }

  return (
    <GoogleMap 
      options={mapOptions}
      disableDefaultUI={true}
      zoom={zoom}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      // mapContainerStyle={{ width, height }}
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
