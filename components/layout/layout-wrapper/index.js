'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import UserContext from '@/context/user-context'
import useSnackbar from '@/hooks/use-snackbar'
import Header from '../header'
import Navbar from '../navbar'
import Spinner from '../spinner'
import SnackbarMessage from '../snackbar'

const LayoutWrapper = ({ children, token }) => {
  const [ openSpinner, setOpenSpinner ] = useState(false)
  const [ userToken, setUserToken ] = useState(token?.value || '')
  const pathname = usePathname()

  const { snackbarHandler, openSnackbar, snackbarMessage, snackbarSeverity } = useSnackbar()

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      <SpinnerContext.Provider value={{ openSpinner, setOpenSpinner }}>
        <SnackbarContext.Provider value={{snackbar: {
          openSnackbar,
          snackbarMessage, 
          snackbarSeverity
        }, snackbarHandler}}>
          <Header logoWidth={80} logoHeight={40} />
          { pathname === '/' && <Navbar /> }
          { children }
          <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
          <SnackbarMessage isOpen={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} />      
        </SnackbarContext.Provider>
      </SpinnerContext.Provider>    
    </UserContext.Provider>
  )
}

export default LayoutWrapper
