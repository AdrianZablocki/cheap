import { redirect } from 'next/navigation'
import mongoose from 'mongoose'

import PostDetails from '@/components/post-details'


const PostPage = async({ params }) => {
  const isValidId = mongoose.isValidObjectId(params?.id)

  if (!isValidId) {
    return redirect('/')
  }

  return (
    <PostDetails postId={params?.id} />
  )
}

export default PostPage
