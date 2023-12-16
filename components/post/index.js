'use client'

import { useMemo } from 'react'
import { useLoadScript } from '@react-google-maps/api'

import Map from '../map'

import styles from './post.module.scss'

const Post = ({ post }) => {
  const libraries = useMemo(() => ['places'], [])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  console.log(post)
  return (
    <li className={styles.post}>
      <div className={styles.map}>
        <Map mapCenter={{lat: post.lat, lng: post.lng}} isLoaded={isLoaded} width="140px" height="140px" zoom={10}/>
      </div>

      <div>
      <div>
          <div>{post.name}</div>
          <div>Nazwa suszu</div>
        </div>
        <div>
          <div>{post.name}</div>
          <div>Nazwa apteki</div>
        </div>
        <div>
          <div>{post.adress}</div>
          <div>Adres</div>
        </div>
      </div>
      
    </li>
  )
}

export default Post
