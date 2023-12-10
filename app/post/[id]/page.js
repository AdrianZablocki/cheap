import axios from 'axios'
import mongoose from 'mongoose'
import { redirect } from 'next/navigation'

import Post from '@/components/post'

const getPost = async (id) => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`)

  return data
}

const PostPage = async({ params }) => {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect('/');
  }

  const { post } = await getPost(params?.id);

  return (
    <>
      <Post post={post} isFullPost />
    </>
  )
}

export default PostPage