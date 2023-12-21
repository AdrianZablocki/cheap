'use client'

import Image from 'next/image'
import { useContext, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import sadIcon from '@/public/icons/sad.svg'
import happyIcon from '@/public/icons/happy.svg'
import redNo2Image from '@/public/images/red-no-2.jpeg'
import { date, setDisabledScroll, updatePost } from '@/utils'
import ConfirmPrice from '../confirm-price'
import ChangePrice from '../change-price'
import IconButton from '../UI/icon-button'
import Modal from '../layout/modal'

import styles from './post.module.scss'

dayjs.extend(utc)

const Post = ({ post }) => {
  const [ postCopy, setPostCopy ] = useState(post)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalContent, setModalContent] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)

  const onUpdatePost = async(payload, invalid) => {
    setOpenSpinner(true)

    const body = invalid ? { isValid: false } : { ...payload, date: dayjs().utc().format(), isValid: true }
    const message = invalid ? 'Post oznaczono jako nieaktualny' : 'Post został zaktualizowany'

    try {
      const data = await updatePost(postCopy._id, body)
      setOpenSpinner(false)
      snackbarHandler(message, SEVERITY.SUCCESS)
      setPostCopy({...postCopy, ...data.changed})
      setShowModal(false)
      setDisabledScroll(false)
    } catch (error) {
      console.log('UPDATE PRICE ERROR', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const modalContentMap = {
    confirm: <ConfirmPrice
        post={postCopy}
        openChangePriceModal={() => onAction('change')}
        showModal={() => setShowModal(false)}
        updatePost={() => onUpdatePost({confirmationCount: ++post.confirmationCount})}
      />,
    change: <ChangePrice
        post={postCopy}
        disablePost={() => onUpdatePost(null, true)}
        updatePost={onUpdatePost}
      />
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

      { showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal> }
    </>
  )
}

export default Post
