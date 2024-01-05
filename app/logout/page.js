import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Logout from '@/components/logout'

const LogoutPage = async() => {

  async function deleteTokens() {
    'use server'

    cookies().delete('token')
    cookies().delete('refreshToken')
    redirect('/')
  }
 
  return (
   <Logout deleteTokens={deleteTokens} />
  )
}

export default LogoutPage
