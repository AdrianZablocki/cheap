'use client'
 
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'

import styles from './refresh-token.module.scss'
import Spinner from '../layout/spinner'

const RefreshToken = ({ refreshToken }) => {

  const location = useSearchParams().get('location')
  const { push } = useRouter()

  useEffect(() => {
   
    const refresh = async (token) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, { token })
       
        push(`/${location}`)
        
      } catch (error) {
        console.log('REFRESH TOKEN ERROR', error)
        
        if (error.response.status === 401 || error.response.status === 405) {
          push('/welcome')
        }
      }
    }
    refresh(refreshToken)
  }, [push, location, refreshToken])

  return (
    <div className={styles.wrapper}>
      <Spinner />
    </div>
  )
}

export default RefreshToken