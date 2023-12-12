import { redirect } from 'next/navigation'
import axios from 'axios'
import mongoose from 'mongoose'
import User from '@/components/user'

const getUser = async (id) => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)

  return data
}

const setValidationFlag = async (user) => {
  const  { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user._id}`, user)

  return data
}

const UserPage = async ({ params, searchParams }) => {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect('/');
  }

  const { user } = await getUser(params?.id)

  if (searchParams?.verified === 'true' && user) {
    const updatedUser = {...user, verified: true}
    console.log('USER', user)

    const res = await setValidationFlag(updatedUser)
    console.log('flag updated', res)
  }

  return (
    <User user={{...user, ...searchParams}} />
  )
}
export default UserPage