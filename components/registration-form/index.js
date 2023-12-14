'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

import UserForm from '../user-form'

const RegistrationForm = () => {
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
        await sendEmail(data.userData.email, data.userData.region, data.userData._id)
      }
      
      console.log(data)
    } catch (error) {
      // TODO errors handler
      console.log(error)
    }
  }

  const sendEmail = async (email, region, id) => {
    console.log(email, region, id)
    try {
      const test = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verification`, {
        email, region, id
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
