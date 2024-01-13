'use client'
 
import { useSearchParams, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import axios from 'axios'

import UserContext from '@/context/user-context'
import Spinner from '../layout/spinner'

const RefreshToken = ({ refreshToken }) => {

  const { setUserToken } = useContext(UserContext)
  const location = useSearchParams().get('location') || ''
  const { push } = useRouter()

  useEffect(() => {
   
    const refresh = async (token) => {
      try {
        const newToken = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, { token })
        setUserToken(newToken.data.accessToken)
        push(`${process.env.NEXT_PUBLIC_API_URL}/${location}`)
      } catch (error) {
        console.log('REFRESH TOKEN ERROR', error)
        
        if (error.response.status === 401 || error.response.status === 405) {
          push('/login')
        }
      }
    }
    refresh(refreshToken)
  }, [push, location, refreshToken, setUserToken])

  return (
    <Spinner isOpen background="#FFF" />
  )
}

export default RefreshToken