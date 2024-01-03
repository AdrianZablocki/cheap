
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'

import User from '@/components/user'

const UserPage = async ({ params }) => {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect('/');
  }

  return (
    <User params={params} />
  )
}

export default UserPage
