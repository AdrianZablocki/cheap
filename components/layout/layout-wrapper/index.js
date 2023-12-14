'use client'

import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import Navbar from '../navbar'
import Spinner from '../spinner'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)
  
  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>
      <Navbar />
      {openSpinner && <Spinner />}
      {children}
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
