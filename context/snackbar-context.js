import { createContext } from 'react'

const SnackbarContext = createContext({
  snackbar: {
    openSnackbar: false, 
    snackbarMessage: '', 
    snackbarSeverity: null
  },
  snackbarHandler: (snackbarMessage, snackbarSeverity) => {}
})

export default SnackbarContext
