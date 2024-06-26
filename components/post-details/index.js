'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import gpsIcon from '@/public/icons/gps.svg'
import phoneIcon from '@/public/icons/phone.svg'
import clockIcon from '@/public/icons/clock.svg'
import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import UserContext from '@/context/user-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import IconButton from '../UI/icon-button'

import styles from './post-details.module.scss'
import Modal from '../layout/modal'
import ChangePrice from '../change-price'
import Button from '../UI/button'
import { getPost, setDisabledScroll, updatePost, deletePost } from '@/utils'
import Dialog from '../layout/dialog'

dayjs.extend(utc)

const iconPadding = '0 4px 0 0'
const daysMap = {
  0: 'Poniedziałek',
  1: 'Wtorek',
  2: 'Środa',
  3: 'Czwartek',
  4: 'Piątek',
  5: 'Sobota',
  6: 'Niedziela'
}

const PostDetails = ({ postId }) => {
  const [ post, setPost ]=useState()
  const [ showModal, setShowModal ] = useState(false)
  const [ showDialog, setShowDialog ] = useState(false)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { userToken } = useContext(UserContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const pathName = usePathname()
  const { push } = useRouter()

  useEffect(() => {
    const fetchData = async() => fetchPosts()
    fetchData()
  }, [])

  const fetchPosts = async() => {
    setOpenSpinner(true)
  
    try {
      const data = await getPost(postId)
      setPost(data.post)
      setOpenSpinner(false)
    } catch (error) {
      console.log(error)
      handleError(error)
      setOpenSpinner(false)
    }
  }

  const onUpdatePost = async(payload) => {
    setOpenSpinner(true)

    const body = { ...payload, date: dayjs().utc().format(), isValid: true }
    const message = 'Post został zaktualizowany'

    try {
      await updatePost(post._id, body)
      setOpenSpinner(false)
      snackbarHandler(message, SEVERITY.SUCCESS)
      setShowModal(false)
      setDisabledScroll(false)
      push('/')
    } catch (error) {
      console.log('UPDATE POST ERROR', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const onDeletePost = async() => {
    setOpenSpinner(true)
    const message = 'Post został usunięty'
    try {
      await deletePost(post._id)
      setOpenSpinner(false)
      snackbarHandler(message, SEVERITY.SUCCESS)
      setShowModal(false)
      setDisabledScroll(false)
      push('/')
    } catch (error) {
      console.log('DELETE POST ERROR', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const onEdit = () => {
    checkAuth()
    setShowModal(true)
  }

  const onDelete = () => {
    checkAuth()
    setShowDialog(true)
    setDisabledScroll(true)
  }

  const onCloseDialog = () => {
    setShowDialog(false)
    setDisabledScroll(false)
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

  const isAuthor = () => userToken && jwtDecode(userToken)?.id === post.authorId

  return (
    <>
      {post && 
        <div className={styles.post}>
          <h1 className={styles.boldText}>{post.strainName}</h1>
          <div className={styles.boldText}>{post.price} zł/gram</div>
          <h2>{post.name}</h2>

          <div className={styles.details}>
            <Link href={post.mapUrl} target='blank'>
              <IconButton alt="gps icon" icon={gpsIcon} padding={iconPadding} />
            </Link>
            <span>{post.address}</span>
          </div>

          <div className={styles.details}>
            <Link href={`tel:${post.contact}`}>
              <IconButton alt="phone icon" icon={phoneIcon} padding={iconPadding} />
            </Link>
            <span>{post.contact}</span>
          </div>

          <div className={`${styles.details} ${styles.oppeningHours}`}>
            <IconButton alt="clock icon" icon={clockIcon} padding={iconPadding} />
            <div>
              {post.openingHours?.map((item, index) => 
                <div key={`openingHours-${index}`} className={styles.hour}>
                  {daysMap[index]} 
                  <span> </span>
                  {item?.open?.hours}:{item?.open?.minutes === 0 ? '00' : item?.open?.minutes}
                  <span> - </span>
                  {item?.close?.hours}:{item?.close?.minutes === 0 ? '00' : item?.close?.minutes}
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.actions} ${!isAuthor() ? styles.noDeleteButton : ''}`}>
            <Button type="button" text="Edytuj" buttonType="success" action={() => onEdit()} />
            {isAuthor() && <Button type="button" text="Usuń" buttonType="error" action={() => onDelete()} />}
          </div>
          { showModal &&
            <Modal onClose={() => setShowModal(false)}>
              <ChangePrice post={post} updatePost={onUpdatePost} />
            </Modal>
          }
          {showDialog &&
            <Dialog
              confirmAction={onDeletePost}
              onClose={onCloseDialog}
              content="Czy na pewno chcesz usunąć wpis?"
            />
          }
        </div>
      }
    </>
  )
}

export default PostDetails
