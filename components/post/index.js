'use client'

import Image from 'next/image'
import { useState } from 'react'
import dayjs from 'dayjs'

import { date, dateWithTime } from '@/utils'
import sadIcon from '@/public/icons/sad.svg'
import happyIcon from '@/public/icons/happy.svg'
import redNo2Image from '@/public/images/red-no-2.jpeg'
import IconButton from '../UI/icon-button'
import Modal from '../layout/modal'

import styles from './post.module.scss'
import ConfirmPrice from '../confirm-price'
import ChangePrice from '../change-price'

const Post = ({ post }) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ modalContent, setModalContent] = useState(<div> modal content</div>)
  const modalContentMap = {
    confirm: <ConfirmPrice post={post} action={() => onAction('change')}/>,
    change: <ChangePrice post={post} showModal={() => setShowModal(false)}/>
  }

  const renderModalContent = (contentType) => {
    return (
      modalContentMap[contentType] || ''
    )
  }

  const onAction = (actionType) => {
    setShowModal(true)
    setModalContent(renderModalContent(actionType))
  }

  return (
    <>
      <li className={styles.post}>
        <div className={styles.header}>
          <div>{post.strainName}</div>
          <div className={styles.price}>
            <div>{post.price} zł/gram</div>
            <div>{dayjs(post.date).format(dateWithTime)}</div>
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
          <IconButton alt="happy icon" icon={happyIcon} padding={'8px'} action={()=>onAction('confirm')} />
          <IconButton alt="sad icon" icon={sadIcon} padding={'8px'} action={()=>onAction('change')} />
          
          {/* <div>
            <Link href="tel:515107460">telefon</Link>
          </div> */}
        </div>
      </li>  

      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          {modalContent}
        </Modal>
      }
    </>
  )
}

export default Post
