'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import SnackbarContext from '@/context/snackbar-context'
import { SEVERITY } from '@/hooks/use-error-handler'
import NewPostForm from '../new-post-form'

const CreateNewPost = () => {
  const { userToken } = useContext(UserContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { push } = useRouter()

  useEffect(() => {
    if(!userToken || !jwtDecode(userToken).isVerified) {
      push(`/refresh?location=/`)
      snackbarHandler('Użytkownik musi mieć zweryfikowane konto aby dodawać i edytować posty', SEVERITY.ERROR)
    }
  }, [userToken, push])

  return (
    <NewPostForm />
  )
}

export default CreateNewPost
