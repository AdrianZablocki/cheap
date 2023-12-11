'use client'

import { useRouter } from 'next/navigation'
import { useState, useContext } from 'react'
import axios from 'axios'

import AuthContext from '@/context/auth-context'

const LoginForm = () => {
  const { setAuthenticated } = useContext(AuthContext)
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ errorMessage, setErrorMesage ] = useState()
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {email, password})
      if (data) {
        setAuthenticated(true)
        push('/')
      }
    } catch (error) {
      // TODO errors handler
      setErrorMesage(error.response.data.message)
      console.log('Coś poszło nie tak', error)
    }
  }

  return (
    <>    
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label>email</label>
          <input onChange={(value) => setEmail(value.target.value)} />
        </fieldset>
        <fieldset>
          <label>hasło</label>
          <input onChange={(value) => setPassword(value.target.value)} />
        </fieldset>
        <div>{errorMessage}</div>
        <button type="submit">submit</button>
      </form>
    </>
  )
}

export default LoginForm
