'use client'

import { useContext, useState } from 'react'
import axios from 'axios'

import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import UserForm from '../user-form'
import Logo from '../layout/logo'
import MailConfirmationPopup from '../mail-confirmation-popup'

import styles from './registration-form.module.scss'

const RegistrationForm = () => {
  const [ openPopup, setOpenPopup ] = useState(false)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)

  const handleSubmit = async (body) => {
    setOpenSpinner(true)
    
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, body)
      snackbarHandler('Uytkownik zosyał utworzony', SEVERITY.SUCCESS)
      if (data) {
        await sendEmail(data.userData.email, data.userData.region, data.userData._id)
      }
    } catch (error) {
      console.log('REGISTER USER', error)
      handleError(error)
      setOpenSpinner(false)
    }
  }

  const sendEmail = async (email, region, id) => {
    try {
      const test = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verification`, {
        email, region, id
      })
      setOpenSpinner(false)
      setOpenPopup(true)
      console.log('WYSŁANO EMAIL WERUFIKACYNY', test)
    } catch (error) {
      setOpenSpinner(false)
      setErrorMesage(error.response.data.error?.message || error.response.data.message)
      console.log('SEND EMAIL ERROR', error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}><Logo width={80} height={40}/></div>
      <UserForm handleSubmit={handleSubmit}/>
      <button onClick={() => setOpenPopup(true)}>open</button>
      <MailConfirmationPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  )
}

export default RegistrationForm
