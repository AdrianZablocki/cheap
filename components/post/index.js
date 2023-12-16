'use client'

import { useMemo } from 'react'
import { useLoadScript } from '@react-google-maps/api'

import Map from '../map'

import styles from './post.module.scss'
import Link from 'next/link'

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
        <Map mapCenter={{lat: post.lat, lng: post.lng}} isLoaded={isLoaded} zoom={10}/>
      </div>

      <div className={styles.content}>
        <div className={styles.productInfo}>
          <div className={styles.label}>nazwa suszu</div>
          <div className={styles.value}>{post.name}</div>

          <div className={styles.actions}>
            <div className={styles.price}>
              <div className={styles.label}>cena</div>
              <div>{post.price}zł/{post.amount}g</div>
            </div>
            {/* <div className={styles.actions}>akcje</div> */}
          </div>
        </div>

        <div className={styles.productAddress}>
          <div className={styles.place}>
            <div className={styles.label}>miasto</div>
            <div className={styles.value}>{post.city}</div> 
          </div>
         
          <Link href={`/post/${post._id}`} className={styles.link}>WIĘCEJ...</Link>
        </div>
        
      </div>
    </li>
  )
}

export default Post
