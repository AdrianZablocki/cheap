import { cookies } from 'next/headers'

import RefreshToken from '@/components/refresh-token'

const Refresh = () => {
  const token = cookies().get('refreshToken')

  return (
    <RefreshToken refreshToken={token?.value}/>
  )
}

export default Refresh
