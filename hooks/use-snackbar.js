import { useCallback, useState } from 'react'

const useSnackbar = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState(undefined)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const setSnackbar = useCallback((open, message, severity) => {
    setOpenSnackbar(open)
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
  }, []);

  const snackbarHandler = useCallback((message, severity) => {
    const timeout = 4000
    setSnackbar(true, message, severity)
    setTimeout(() => setSnackbar(false, '', undefined), timeout)
  }, [setSnackbar])

  return {
    snackbarHandler,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity
  }
}

export  default  useSnackbar
