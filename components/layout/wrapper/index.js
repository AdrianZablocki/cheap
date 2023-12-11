'use client'

import { useState } from 'react'

import AuthContext from '@/context/auth-context'

const LayoutWrapper = ({ children, isLogged }) => {
  const [authenticated, setAuthenticated] = useState(isLogged)

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <h1> user is {`${authenticated ? "" : "not"} authenticated`} </h1>
      {children}
    </AuthContext.Provider>
  )
}

export default LayoutWrapper
