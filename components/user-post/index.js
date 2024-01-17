import { usePathname, useRouter } from 'next/navigation'
import  { useContext, useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { jwtDecode } from 'jwt-decode'

import { date, deletePost, setDisabledScroll, updatePost } from '@/utils'
import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import Button from '../UI/button'
import Modal from '../layout/modal'
import Dialog from '../layout/dialog'
import ChangePrice from '../change-price'

import styles from './user-post.module.scss'

dayjs.extend(utc)

const UserPost = ({ post, token, getUser }) => {
  const [ showModal, setShowModal ] = useState(false)
  const [ showDialog, setShowDialog ] = useState(false)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const pathName = usePathname()
  const { push } = useRouter()

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
      getUser()
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
      getUser()
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
    if(!token || !jwtDecode(token).isVerified) {
      push(`/refresh?location=${pathName}`)
      return
    }
  }

  return (
    <>
      <li className={styles.post}>
        <h2>{post.strainName}<span>{dayjs(post.date).format(date)}</span></h2>
        <h3>{post.price} zł/gram</h3>
        <p>{post.name}</p>
        <p>{post.address}</p>
        <div className={styles.actions}>
          <Button buttonType="success" type="button" text="Edytuj" action={() => onEdit()} />
          <Button buttonType="error" type="button" text="Usuń" action={() => onDelete()} />
        </div>
      </li> 
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
    </>
  ) 
}

export default UserPost
