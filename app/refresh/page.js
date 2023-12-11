import { cookies } from 'next/headers'

import RefreshToken from '@/components/layout/refresh-token'

const Refresh = () => {
  const token = cookies().get('refresToken')

  return (
    <RefreshToken refreshToken={token?.value}/>
  )
}

export default Refresh
