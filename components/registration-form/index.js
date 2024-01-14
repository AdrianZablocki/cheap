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
      snackbarHandler('Konto zostało utworzone', SEVERITY.SUCCESS)
      console.log('client create user', data)
      if (data) {
        await sendEmail(
          data.userData.email,
          data.userData.name,
          data.userData._id,
          data.userData.validationToken
        )
      }
    } catch (error) {
      console.log('REGISTER USER', error)
      handleError(error)
      setOpenSpinner(false)
    }
  }

  const sendEmail = async (email, name, id, validationToken) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/verification`, {
        email, name, id, validationToken
      })
      setOpenSpinner(false)
      setOpenPopup(true)
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
      console.log('SEND VERIFICATION EMAIL ERROR', error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}><Logo /></div>
      <UserForm handleSubmit={handleSubmit}/>
      <MailConfirmationPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </div>
  )
}

export default RegistrationForm
