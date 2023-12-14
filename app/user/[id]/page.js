import { redirect } from 'next/navigation'
import axios from 'axios'
import mongoose from 'mongoose'
import User from '@/components/user'

const getUser = async (id) => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)

  return data
}

const UserPage = async ({ params }) => {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect('/');
  }

  const { user } = await getUser(params?.id)

  return (
    <User user={user} />
  )
}

export default UserPage
