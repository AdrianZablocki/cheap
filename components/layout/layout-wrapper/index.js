'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import UserContext from '@/context/user-context'
import useSnackbar from '@/hooks/use-snackbar'
import Header from '../header'
import Spinner from '../spinner'
import SnackbarMessage from '../snackbar'
import Footer from '../footer'
import Dialog from '../dialog'

const policy = 'cookiesPolicyIsConfirmed'
const content = 'Akceptując pliki cookie, pozwalasz nam personalizować i ulepszać Twoje doświadczenia na cheapweed.pl oraz wyświetlać treści, które najbardziej Cię interesują. (Polityka cookie)'

const LayoutWrapper = ({ children, token }) => {
  const [ openSpinner, setOpenSpinner ] = useState(false)
  const [ userToken, setUserToken ] = useState(token?.value || '')
  const [ showDialog, setShowDialog ] = useState(true)
  const pathname = usePathname()
  const { push } = useRouter()

  const { snackbarHandler, openSnackbar, snackbarMessage, snackbarSeverity } = useSnackbar()

  const headerlessViews = [ '/login', '/registration' ]

  const confirmPilicy = () => {
    localStorage?.setItem(policy, true)
    setShowDialog(false)
  }

  const readMoreAboutpolicy = () => {
    localStorage?.setItem(policy, true)
    push('/privacy-policy')
    setShowDialog(false)
  }

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      <SpinnerContext.Provider value={{ openSpinner, setOpenSpinner }}>
        <SnackbarContext.Provider value={{snackbar: {
          openSnackbar,
          snackbarMessage, 
          snackbarSeverity
        }, snackbarHandler}}>
          { !headerlessViews.includes(pathname) && <Header />}
          { children }
          { pathname === '/' && <Footer /> }
          {!localStorage?.getItem(policy) && showDialog &&
            <Dialog
              confirmAction={confirmPilicy}
              confirmText="Akceptuję"
              moreAction={readMoreAboutpolicy}
              content={content}
            />
          }
          <Spinner isOpen={openSpinner} background="rgba(#747976, .8)" />
          <SnackbarMessage isOpen={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} />      
        </SnackbarContext.Provider>
      </SpinnerContext.Provider>    
    </UserContext.Provider>
  )
}

export default LayoutWrapper
