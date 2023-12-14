'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'



const LoginForm = () => {
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const [ errorMessage, setErrorMesage ] = useState()
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data }  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {email, password})
      if (data) {
 
        push('/')
      }
    } catch (error) {
      // TODO errors handler

      setErrorMesage(error?.response?.data.message)
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