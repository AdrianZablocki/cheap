'use client'

import { useState } from 'react'

import Navbar from '../navbar'

const LayoutWrapper = ({ children, isLogged }) => {
  const [authenticated, setAuthenticated] = useState(isLogged)
  
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default LayoutWrapper
