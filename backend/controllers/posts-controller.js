import Post from '../models/post'

export const getPosts = async(req, res, next) => {
  const postsPerPage = 5
  const postsCount = await Post.estimatedDocumentCount()
  const posts = await Post.find()

  res.status(200).json({ 
    postsPerPage,
    postsCount,
    posts: posts.reverse()
  })
}

export const getPost = async(req, res, next) => {
  const post = await Post.findById(req.query.id)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
  }

  res.status(200).json({ post })
}

export const createPost = async(req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({ post })
  } catch (error) {
    res.status(500).json({ message: 'Coś poszło nie tak, spróbuj ponownie później', error })
  }

}

export const deletePost = async(req, res, next) => {
  const post = await Post.findByIdAndDelete(req.query.id)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
  }

  res.status(200).json({ success: 'Post deleted' })
}

export const updatePost = async(req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.query.id, req.body)

  if (!post) {
    res.status(404).json({ error: 'Post not found' })
  }

  res.status(200).json({ success: 'Post updated' })
}
