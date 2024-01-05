'use client'

import Link from 'next/link'
import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import SpinnerContext from '@/context/spinner-context'

import styles from './user.module.scss'
import UserPost from '../user-post'

const User = ({ params }) => {
  const [ user, setUser ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)

  useEffect(() => {
    const fetchData = async() => {
      setOpenSpinner(true)
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${params.id}`)
        setUser(data.user)
        setOpenSpinner(false)
      } catch (error) {
        console.log(error)
        setOpenSpinner(false)
      }
    } 
    fetchData()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{user?.name}</div>
      <Link href="/">Edytuj dane konta</Link>
      <Link href="/logout">Wyloguj</Link>
      <div className={styles.postsWrapper}>
        <span>Moje wpisy</span>
        <ul>
          {user && user?.posts.map((post, index) => 
            <UserPost key={`user-post-${index}-${post._id}`} post={post} />
          )}          
        </ul>
      </div>
    </div>
  )
} 

export default User