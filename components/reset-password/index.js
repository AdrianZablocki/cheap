'use client'

import { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { EMAIL_REGEX, getFormikError } from '@/utils'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import Input from '../UI/input'
import Button from '../UI/button'
import axios from 'axios'

const validation = Yup.object({
  email: Yup
    .string()
    .required('Email wymagany')
    .matches(EMAIL_REGEX, 'Adres e-mail musi być prawidłowy')
})

const ResetPassword = () => {
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validation,
    onSubmit: (values) => handleSubmit(values.email)
  })

  const handleSubmit = async(email) => {
    setOpenSpinner(true)
    try {
      const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reset`, { email })
      sendEmail(
        data.userData.email,
        data.userData.name,
        data.userData._id,
        data.userData.resetPasswordToken
      )
      snackbarHandler('Wysłaliśmy email z linkiem do zresetowania hasła', SEVERITY.SUCCESS)
    } catch (error) {
      console.log('rest pass error', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const sendEmail = async(email, name, id, resetPasswordToken) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-email`, {
        email, name, id, resetPasswordToken
      })
      setOpenSpinner(false)
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
      console.log('SEND RESET PASWORD EMAIL ERROR', error)
    }
  }

  return (
    <div>
      <h3>reset password</h3>

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          id="email"
          name="email"
          value={formik.values.email}
          label="Podaj email, na który wyślemy link resetujący hasło"
          placeholder="Wpisz email"
          onChange={formik.handleChange}
          error={getFormikError(formik, 'email')}
          onBlur={() => formik.setFieldTouched('email')}
        />
        <Button type="submit" buttonType="successFilled" text="Wyślij" disabled={!(formik.isValid && formik.dirty)}/>
      </form>
    </div>
  )
}

export default ResetPassword
