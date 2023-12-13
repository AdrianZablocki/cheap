'use client'

import { useState } from 'react'

import AuthContext from '@/context/auth-context'
import Navbar from '../navbar'

const LayoutWrapper = ({ children, isLogged }) => {
  const [authenticated, setAuthenticated] = useState(isLogged)

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <Navbar />
      {children}
    </AuthContext.Provider>
  )
}

export default LayoutWrapper
