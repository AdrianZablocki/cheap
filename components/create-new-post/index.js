'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import NewPostForm from '../new-post-form'

const CreateNewPost = () => {
  const { userToken } = useContext(UserContext)
  const { push } = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    console.log(pathName)
    if(!userToken || !jwtDecode(userToken).isVerified) {
      push(`/refresh?location=${pathName}`)
    }
  }, [userToken, pathName, push])

  return (
    <NewPostForm />
  )
}

export default CreateNewPost
