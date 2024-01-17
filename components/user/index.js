'use client'

import Link from 'next/link'
import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import UserContext from '@/context/user-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import UserPost from '../user-post'

import styles from './user.module.scss'
import Dialog from '../layout/dialog'
import { useRouter } from 'next/navigation'

const User = ({ params }) => {
  const [ user, setUser ] = useState()
  const [ posts, setPosts ] = useState()
  const [ showDialog, setShowDialog ] = useState(false)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { userToken } = useContext(UserContext)
  const { push } = useRouter()

  useEffect(() => {
    const fetchData = async() => {
      getUser()
    } 
    fetchData()
  }, [])

  const getUser = async() => {
    setOpenSpinner(true)
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${params.id}`)
      setUser(data.user)
      setPosts(data.user.posts)
      setOpenSpinner(false)
    } catch (error) {
      console.log(error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const deleteAccount = async() => {
    setOpenSpinner(true)
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${params.id}`)
      console.log(data)
      setOpenSpinner(false)
      setShowDialog(false)
      push('/logout')
      snackbarHandler(`Konto użytkownika zostało usunięte`, SEVERITY.SUCCESS)
    } catch (error) {
      console.log(error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{user?.name}</div>
      <Link href={`/reset-password?userId=${user?._id}&token=${userToken}&name=${user?.name}`}>Zmień hasło</Link>
      <Link href="/logout">Wyloguj</Link>
      <div className={styles.deleteAccount}>
        <button type="button" onClick={() => setShowDialog(true)}>Usuń konto</button>
      </div>
      <div className={styles.postsWrapper}>
        <span>Moje wpisy</span>
        <ul>
          {posts && posts.map((post, index) =>
            <UserPost key={`user-post-${index}-${post._id}`} post={post} token={userToken} getUser={getUser} />
          )}          
        </ul>
      </div>

      {showDialog &&
        <Dialog
          confirmAction={deleteAccount}
          onClose={setShowDialog}
          content="Czy na pewno chcesz usunąć konto?"
        />
      }

    </div>
  )
} 

export default User