'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { EMAIL_REGEX, getFormikError } from '@/utils'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import Input from '../UI/input'
import Button from '../UI/button'

import styles from './reset-password.module.scss'

const validationEmail = Yup.object({
  email: Yup
    .string()
    .required('Email wymagany')
    .matches(EMAIL_REGEX, 'Adres e-mail musi być prawidłowy')
})

const validationChangePassword = Yup.object({
  password: Yup
    .string()
    .min(8, 'Hasło musi mieć przynajmniej 8 znaków')
    .required('Nowe hasło jest wymagane'),
  confirmPassword: Yup
    .string()
    .min(8, 'Hasło musi mieć przynajmniej 8 znaków')
    .oneOf([Yup.ref('password'), null], "Hasła muszą być identyczne")
    .required('Potwierdzenie nowego hasła jest wymagane')
})

const ResetPassword = ({ params }) => {
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { push } = useRouter()

  const sendEmailValues = { email: '' }
  const changePasswordValues = { password: '', confirmPassword: '' }

  const checkParams = () => {
    return params.userId && params.token
  }

  const formik = useFormik({
    initialValues: checkParams() ? changePasswordValues : sendEmailValues,
    validationSchema: checkParams() ? validationChangePassword : validationEmail,
    onSubmit: (values) => checkParams() ? handelChangePasswordSubmit(values) : handleEmailSubmit(values)
  })

  const handleEmailSubmit = async(values) => {
    setOpenSpinner(true)
    try {
      const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reset`, { email: values.email })
      sendEmail(
        data.userData.email,
        data.userData.name,
        data.userData._id,
        data.userData.resetPasswordToken
      )
    } catch (error) {
      console.log('send reset password email error', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const sendEmail = async(email, name, id, resetPasswordToken) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-email`, {
        email, name, id, resetPasswordToken
      })
      snackbarHandler('Wysłaliśmy email z linkiem do zresetowania hasła', SEVERITY.SUCCESS)
      setOpenSpinner(false)
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
      console.log('SEND RESET PASWORD EMAIL ERROR', error)
    }
  }

  const handelChangePasswordSubmit = async(values) => {
    setOpenSpinner(true)
    const { userId, token } = params
    try {
      const  { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/change-password`, {
        password: values.password,
        id: userId,
        token
      })
      setOpenSpinner(false)
      snackbarHandler('Hasło zostało zmienione, moesz teraz sie zalogować', SEVERITY.SUCCESS)
      push('/login')
    } catch (error) {
      console.log('Change password error', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        {!checkParams() ? 
          (<Input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            label="Podaj email, na który wyślemy link resetujący hasło"
            placeholder="Wpisz email"
            onChange={formik.handleChange}
            error={getFormikError(formik, 'email')}
            onBlur={() => formik.setFieldTouched('email')}
          />) :
          (<>
            <Input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              label="Podaj nowe hasło"
              onChange={formik.handleChange}
              error={getFormikError(formik, 'password')}
              onBlur={() => formik.setFieldTouched('password')}
            />
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              label="Powtórz hasło"
              onChange={formik.handleChange}
              error={getFormikError(formik, 'confirmPassword')}
              onBlur={() => formik.setFieldTouched('confirmPassword')}
            />
            
          </>)
        }
        <div className={styles.actions}>
          <Button type="submit" buttonType="successFilled" text="Wyślij" disabled={!(formik.isValid && formik.dirty)} />
        </div>
      </form>
    </div>
  )
}
//disabled={!(formik.isValid && formik.dirty)}
export default ResetPassword
