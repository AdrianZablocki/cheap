'use client'

import { useContext, useEffect, useRef } from 'react'

import UserContext from '@/context/user-context'

const Logout = ({ deleteTokens }) => {
  const { setUserToken } = useContext(UserContext)
  const deleteTokensRef = useRef(deleteTokens)

  useEffect(() => {
    deleteTokensRef.current = deleteTokens
  });

  useEffect(() => {
    deleteTokensRef.current()
  }, [])

  useEffect(() => {
    setUserToken('')
  })

  return null
}

export default Logout