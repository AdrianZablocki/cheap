'use client'

import Image from 'next/image'
import { useState } from 'react'
import dayjs from 'dayjs'

import sadIcon from '@/public/icons/sad.svg'
import happyIcon from '@/public/icons/happy.svg'
import redNo2Image from '@/public/images/red-no-2.jpeg'
import { date } from '@/utils'
import ConfirmPrice from '../confirm-price'
import ChangePrice from '../change-price'
import IconButton from '../UI/icon-button'
import Modal from '../layout/modal'

import styles from './post.module.scss'

const Post = ({ post }) => {
  const [ postCopy, setPostCopy ] = useState(post)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalContent, setModalContent] = useState(<div> modal content</div>)
  const modalContentMap = {
    confirm: <ConfirmPrice post={post} action={() => onAction('change')} />,
    change: <ChangePrice post={postCopy} showModal={() => setShowModal(false)} setChanges={setPostCopy}/>
  }

  const renderModalContent = (contentType) => (modalContentMap[contentType] || '')

  const onAction = (actionType) => {
    setShowModal(true)
    setModalContent(renderModalContent(actionType))
  }

  return (
    <>
      <li className={styles.post}>
        <div className={styles.header}>
          <div>{postCopy.strainName} {!postCopy.isValid && <span>nieaktualne</span>}</div>
          <div className={styles.price}>
            <div>{postCopy.price} zł/gram</div>
            <div>{dayjs(postCopy.date).format(date)}</div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image className={styles.image} src={redNo2Image} alt="red" fill={false} />
        </div>

        <div className={styles.content}>
            <div className={styles.storeName}>{postCopy.name}</div> 
            <div className={styles.label}>apteka</div>
            <div className={styles.address}>{postCopy.address}</div> 
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
