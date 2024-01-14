'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import UserContext from '@/context/user-context'
import { EMAIL_REGEX, getFormikError } from '@/utils'
import styles from './login-form.module.scss'
import Logo from '../layout/logo'
import Input from '../UI/input'
import Button from '../UI/button'
import Link from 'next/link'

const validation = Yup.object({
  email: Yup
    .string()
    .required('Email jest wymagany')
    .matches(EMAIL_REGEX, 'Adres e-mail musi być prawidłowy'),
  password: Yup.string().required('Hasło jest wymagane')
})

const LoginForm = () => {
  const { setUserToken } = useContext(UserContext)
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
      handleSubmit(values)
    }
  })

  const formConfig = [
    {
      id: 'email',
      value: '',
      type: 'email',
      label: 'Adres e-mail',
      placeholder: 'Podaj email',
      autoComplete: 'username'
    },
    {
      id: 'password',
      value: '',
      type: 'password',
      label: 'Hasło',
      placeholder: 'Wpisz hasło',
      autoComplete: 'current-password'
    }
  ]

  const handleSubmit = async (body) => {
    setOpenSpinner(true)

    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, body)
      setUserToken(data.accessToken)
      setOpenSpinner(false)
      snackbarHandler('Witamy ponownie!', SEVERITY.SUCCESS)
      push('/')
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}><Logo width={80} height={40}/></div>

      <div className={styles.welcome}>Cześć!</div>

      <form onSubmit={formik.handleSubmit}>
        {
          formConfig.map(field =>
            <div key={`login-form-${field.id}`}>
              <Input 
                id={field.id}
                name={field.id}
                value={formik.values[field.id]}
                label={field.label}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                error={getFormikError(formik, field.id)}
                onChange={formik.handleChange}
                onBlur={() => formik.setFieldTouched(field.id)}
              />
            </div>
          )
        }

        <Link className={styles.forgotPassword} href="/reset-password" passHref>Nie pamiętam hasła</Link>

        <div className={styles.actionsWrapper}>
          <Button type="submit" text="Zaloguj" buttonType="successFilled" disabled={!(formik.isValid && formik.dirty)} />
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
