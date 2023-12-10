'use client'

import { useState } from 'react'
import axios from 'axios'

const LoginForm = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {email, password})

    console.log(data)
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
        <button type="submit">submit</button>
      </form>
    </>

  )
}

export default LoginForm