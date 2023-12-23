'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import UserContext from '@/context/user-context'
import { EMAIL_REGX } from '@/utils'
import styles from './login-form.module.scss'
import Logo from '../layout/logo'
import Input from '../UI/input'
import Button from '../UI/button'

const validation = Yup.object({
  email: Yup
    .string()
    .required('Email wymagany')
    .matches(EMAIL_REGX, 'Adres e-mail musi być prawidłowy'),
  password: Yup.string().required('Hasło wymagane')
})

const LoginForm = () => {
  const { setUserToken } = useContext(UserContext)
  // const [ email, setEmail ] = useState()
  // const [ password, setPassword ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { push } = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validation,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values)
    }
  })

  const formConfig = [
    {
      id: 'email',
      name: 'email',
      value: '',
      type: 'email',
      label: 'Adres e-mail',
      // onChange: setEmail,
      placeholder: 'Podaj email',
      autoComplete: 'username'
    },
    {
      id: 'password',
      name: 'password',
      value: '',
      type: 'password',
      label: 'Hasło',
      // onChange: setPassword,
      placeholder: 'Wpisz hasło',
      autoComplete: 'current-password'
    }
  ]

  const handleSubmit = async (body) => {
    // e.preventDefault()
    setOpenSpinner(true)

    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, body)
      setUserToken(data.accessToken)
      setOpenSpinner(false)
      snackbarHandler('Witamy ponownie! Czego specjalnego poszukujesz?', SEVERITY.SUCCESS)
      push('/')
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
    }
  }

  const getFormikValue = (controlName) => {
    return formik.values[controlName]
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo width={80} height={40}/>
      </div>
      <div className={styles.welcome}>Witaj po przerwie!</div>

      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <form onSubmit={formik.handleSubmit}>
        {
          formConfig.map(field =>
            <div key={`login-form-${field.id}`}>
              <Input 
                id={field.id}
                // value={field.value}
                value={getFormikValue(field.name)}
                label={field.label}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                onChange={formik.handleChange}
                error={formik.errors[field.name]}
                // onChange={(e) => field.onChange(e.target.value)}
              />
            </div>

          )
        }

        <div className={styles.actionsWrapper}>
          <Button type="submit" text="Zaloguj" buttonType="successFilled" disabled={!formik.isValid} />
        </div>
      </form>

      <div className={styles.actionsWrapper}>
        <div className={styles.activeUser}>Masz już konto?</div>
        <Button type="button" text="Zarejestruj się" buttonType="success" action={() => push('/registration') }/>        
      </div>
    </div> 
  )
}

export default LoginForm
