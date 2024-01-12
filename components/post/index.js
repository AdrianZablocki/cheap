'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useContext, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import cancelIcon from '@/public/icons/cancel.svg'
import confirmIcon from '@/public/icons/confirm.svg'
import phoneIcon from '@/public/icons/phone.svg'
import moreIcon from '@/public/icons/more.svg'
import { date, setDisabledScroll, updatePost } from '@/utils'
import ConfirmPrice from '../confirm-price'
import ChangePrice from '../change-price'
import IconButton from '../UI/icon-button'
import Modal from '../layout/modal'

import styles from './post.module.scss'
import Link from 'next/link'
import { imagesMap } from '@/utils/images/images-map'

dayjs.extend(utc)

const Post = ({ post }) => {
  const [ postCopy, setPostCopy ] = useState(post)
  const [ showModal, setShowModal ] = useState(false)
  const [ modalContent, setModalContent ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { userToken } = useContext(UserContext)
  const { push } = useRouter()
  const pathName = usePathname()

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
    checkAuth()
    setShowModal(true)
    setModalContent(renderModalContent(actionType))
  }

  const checkAuth = () => {
    if(!userToken || !jwtDecode(userToken).isVerified) {
      const message = !userToken 
        ? 'Użytkownik musi być zalogowany'
        : 'Użytkownik musi mieć zweryfikowane konto aby dodawać i edytować posty'

      push(`/refresh?location=${pathName}`)
      snackbarHandler(message, SEVERITY.ERROR)
      return
    }
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
          <Image
            className={styles.image}
            src={imagesMap.get(postCopy.strainName)}
            alt={postCopy.strainName}
            fill={false} priority
          />
        </div>

        <div className={styles.content}>
            <div className={styles.storeName}>{postCopy.name}</div> 
            <div className={styles.label}>apteka</div>
            <div className={styles.address}>{postCopy.address}</div> 
            <div className={styles.label}>adres</div>
        </div>

        <div className={styles.actions}>
          <IconButton
            alt="happy icon"
            icon={confirmIcon}
            padding={'8px'}
            action={()=>onAction('confirm')}
          />
          <IconButton
            alt="sad icon"
            icon={cancelIcon}
            padding={'8px'}
            action={()=>onAction('change')}
          />
          <Link href={`tel:${post.contact}`}>
            <IconButton
              alt="phone icon"
              icon={phoneIcon}
              padding={'8px'}
            />
          </Link>
          <Link href={`/post/${post._id}`}>
            <IconButton
              alt="phone icon"
              icon={moreIcon}
              padding={'8px'}
            />
          </Link>
        </div>
      </li>  

      { showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal> }
    </>
  )
}

export default Post
