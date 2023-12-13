'use client'

import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import axios from 'axios'

import AuthContext from '@/context/auth-context'
import UserForm from '../user-form'

const RegistrationForm = () => {
  const { setAuthenticated } = useContext(AuthContext)
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ region, setRegion ] = useState()
  const [ errorMessage, setErrorMesage ] = useState()
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        role: 'user',
        verified: false,
        email, password, region
      })

      if (data) {
        await sendEmail(data.userData.email, data.userData.region)
      }
      
      console.log(data)
    } catch (error) {
      // TODO errors handler
      console.log(error)
    }
  }

  const sendEmail = async (email, region) => {
    try {
      const test = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verification`, {
        email, region
      })
      console.log('WYSŁANO EMAIL WERUFIKACYNY', test)
    } catch (error) {
      console.log('SEND EMAIL ERROR', error)
    }
  }

  return (
    <UserForm
      errorMessage={errorMessage}
      handleSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      setRegion={setRegion}
    />
  )
}

export default RegistrationForm
