'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useSnackbar from '@/hooks/use-snackbar'
import Navbar from '../navbar'
import Spinner from '../spinner'
import SnackbarMessage from '../snackbar'

const LayoutWrapper = ({ children }) => {
  const [openSpinner, setOpenSpinner] = useState(false)
  const pathname = usePathname()

  const { snackbarHandler, openSnackbar, snackbarMessage, snackbarSeverity } = useSnackbar()

  return (
    <SpinnerContext.Provider value={{openSpinner, setOpenSpinner}}>
      <SnackbarContext.Provider value={{snackbar: {
        openSnackbar,
        snackbarMessage, 
        snackbarSeverity
      }, snackbarHandler}}>
        { pathname === '/' && <Navbar /> }
        { children }
        <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
        <SnackbarMessage isOpen={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} />      
      </SnackbarContext.Provider>
    </SpinnerContext.Provider>
  )
}

export default LayoutWrapper
