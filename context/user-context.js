import { createContext } from 'react'

const UserContext = createContext({
  userToken: '',
  setUserToken: () => {}
})

export default UserContext
