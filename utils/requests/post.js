import axios from 'axios'

export const getPosts = async (query) => {
  const url = query ? `/api/posts?${query}` : '/api/posts'
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`)

  return data
}

export const updatePost = async (id, body ) => {
  const  { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, body)
  return data
}

export const createPost = async (body) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, body)
  return data
}