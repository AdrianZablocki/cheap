'use client'

import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import Navbar from '../navbar'
import Spinner from '../spinner'
import Logo from '../logo'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)

  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>

      <Navbar />

      { children }
      
      <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
      
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
