'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import axios from 'axios'

import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import SpinnerContext from '@/context/spinner-context'
import UserContext from '@/context/user-context'

import styles from './login-form.module.scss'
import Logo from '../layout/logo'
import Input from '../UI/input'
import Button from '../UI/button'

const LoginForm = () => {
  const { setUserToken } = useContext(UserContext)
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { push } = useRouter()

  const formConfig = [
    {
      id: 'email',
      value: '',
      type: 'email',
      label: 'Adres e-mail',
      onChange: setEmail,
      placeholder: 'Podaj email',
      autoComplete: 'username'
    },
    {
      id: 'password',
      value: '',
      type: 'password',
      label: 'Hasło',
      onChange: setPassword,
      placeholder: 'Wpisz hasło',
      autoComplete: 'current-password'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log({email, password})

    setOpenSpinner(true)
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {email, password})
      console.log('LOGIN FORM', data)
      setUserToken(data.accessToken)
      setOpenSpinner(false)
      snackbarHandler('Witamy ponownie! Czeg specjalnego poszukujesz?', SEVERITY.SUCCESS)
      push('/')
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo width={80} height={40}/>
      </div>
      <div className={styles.welcome}>Witaj po przerwie!</div>

      <form onSubmit={(e) => handleSubmit(e)}>
        {
          formConfig.map(field =>
            <Input 
              key={`login-form-${field.id}`}
              id={field.id}
              value={field.value}
              label={field.label}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )
        }

        <div className={styles.actionsWrapper}>
          <Button type="submit" text="Zaloguj" buttonType="successFilled"/>
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
