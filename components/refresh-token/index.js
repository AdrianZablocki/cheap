'use client'
 
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useContext } from 'react'
import axios from 'axios'

import AuthContext from '@/context/auth-context'

const RefreshToken = ({ refreshToken }) => {
  const { setAuthenticated } = useContext(AuthContext)
  const location = useSearchParams().get('location')
  const { push } = useRouter()

  useEffect(() => {
    setAuthenticated(false)
    const refresh = async (token) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, { token })
        setAuthenticated(true)
        push(`/${location}`)
      } catch (error) {
        console.log('REFRESH', error)
        
        if (error.response.status === 401 || error.response.status === 405) {
          push('/welcome')
        }
      }
    }
    refresh(refreshToken)
  }, [setAuthenticated, push, location, refreshToken])

  return (
    <div>Loading ...</div>
  )
}

export default RefreshToken