'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import dayjs from 'dayjs'

import styles from './post.module.scss'

import { date } from '@/utils'

import sadIcon from '@/public/icons/sad.svg'
import Map from '../map'
import IconButton from '../layout/icon-button'
import Modal from '../layout/modal'


const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false)

  const libraries = useMemo(() => ['places'], [])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  console.log(post)
  return (
    <>
      <li className={styles.post}>
        <div className={styles.header}>
          <div>{post.name}</div>
          <div className={styles.price}>
            <div>{post.price} zł/gram</div>
            <div>{dayjs(post.date).format(date)}</div>
          </div>
        </div>

        <div className={styles.map}>
          {/* <Map mapCenter={{lat: post.lat, lng: post.lng}} isLoaded={isLoaded} zoom={10} /> */}
        </div>

        <div className={styles.content}>
            <div className={styles.storeName}>{post.name}</div> 
            <div className={styles.label}>apteka</div>
            <div className={styles.address}>{post.address}</div> 
            <div className={styles.label}>adres</div>
        </div>

        <div className={styles.actions}>
          <IconButton alt="sad icon" icon={sadIcon} padding={'8px'} action={()=>setShowModal(true)} />

          <div>
            <Link href="tel:515107460">telefon</Link>
          </div>
        </div>
      </li>  

      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          formularze zmiany ceny
        </Modal>
      }
    </>

  )
}

export default Post
