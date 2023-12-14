import { createContext } from 'react'

const SpinnerContext = createContext({
  openSpinner: false,
  setOpenSpinner: () => {}
})

export default SpinnerContext
