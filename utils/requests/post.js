import axios from 'axios'

export const updatePost = async (id, body ) => {
  const  { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, body)
  return data
}
