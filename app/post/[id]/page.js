import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import mongoose from 'mongoose'

import PostDetails from '@/components/post-details'


const PostPage = async({ params }) => {
  const token = cookies().get('token')
  const isValidId = mongoose.isValidObjectId(params?.id)

  if (!isValidId) {
    return redirect('/')
  }

  return (
    <PostDetails postId={params?.id} token={token?.value} />
  )
}

export default PostPage
