'use client'

import Image from 'next/image'
import { useState } from 'react'
import dayjs from 'dayjs'

import { date } from '@/utils'
import sadIcon from '@/public/icons/sad.svg'
import redNo2Image from '@/public/images/red-no-2.webp'
import IconButton from '../layout/icon-button'
import Modal from '../layout/modal'

import styles from './post.module.scss'

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <li className={styles.post}>
        <div className={styles.header}>
          <div>{post.strainName}</div>
          <div className={styles.price}>
            <div>{post.price} zł/gram</div>
            <div>{dayjs(post.date).format(date)}</div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image className={styles.image} src={redNo2Image} alt="red" fill={false} />
        </div>

        <div className={styles.content}>
            <div className={styles.storeName}>{post.name}</div> 
            <div className={styles.label}>apteka</div>
            <div className={styles.address}>{post.address}</div> 
            <div className={styles.label}>adres</div>
        </div>

        <div className={styles.actions}>
          <IconButton alt="sad icon" icon={sadIcon} padding={'8px'} action={()=>setShowModal(true)} />

          {/* <div>
            <Link href="tel:515107460">telefon</Link>
          </div> */}
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
