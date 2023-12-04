import Post from '../models/post'

export const getPosts = async(req, res, next) => {
  
  const postsPerPage = 5
  const postsCount = await Post.estimatedDocumentCount()
  const posts = await Post.find()

  res.status(200).json({ 
    postsPerPage,
    postsCount,
    posts
  })
}