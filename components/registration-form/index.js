'use client'

import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import axios from 'axios'

import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import UserForm from '../user-form'

import styles from './registration-form.module.scss'
import Logo from '../layout/logo'

const RegistrationForm = () => {
  const [ name, setName ] = useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ region, setRegion ] = useState()
  const [ consent, setConsent ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { push } = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOpenSpinner(true)
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        role: 'user',
        verified: false,
        email, password, region, name, consent
      })
      snackbarHandler('Uytkownik zosyał utworzony', SEVERITY.SUCCESS)
      if (data) {
        await sendEmail(data.userData.email, data.userData.region, data.userData._id)
      }
      console.log(data)
      console.log('UTWORZONO UZYTKOWNIKA', data)
    } catch (error) {
      console.log('REGISTER USER', error)
      handleError(error)
      setOpenSpinner(false)
    }
  }

  const sendEmail = async (email, region, id) => {
    console.log(email, region, id)
    try {
      const test = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verification`, {
        email, region, id
      })

      setOpenSpinner(false)
      push('/')
      console.log('WYSŁANO EMAIL WERUFIKACYNY', test)
    } catch (error) {
      setOpenSpinner(false)
      setErrorMesage(error.response.data.error?.message || error.response.data.message)
      console.log('SEND EMAIL ERROR', error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo width={80} height={40}/>
        {/* <h1>Medyczny suszu w najlepszej cenie</h1> */}
      </div>
      
      
      <UserForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        setRegion={setRegion}
        setName={setName}
        setConsent={setConsent}
      />
    </div>
  )
}

export default RegistrationForm
