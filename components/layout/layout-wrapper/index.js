'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import Navbar from '../navbar'
import Spinner from '../spinner'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)
  const pathname = usePathname()

  console.log(pathname)

  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>

      { pathname === '/' && <Navbar /> }

      { children }
      
      <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
      
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
