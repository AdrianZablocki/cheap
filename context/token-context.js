import { createContext } from 'react'

const TokenContext = createContext({
  refreshToken: ''
})

export default TokenContext
