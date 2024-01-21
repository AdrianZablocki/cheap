import Post from '../models/post'
import APIFilters from '../utils/api-filters'

export const getPosts = async(req, res, next) => {

  const postsPerPage = 9
  const postsCount = await Post.estimatedDocumentCount()
  
  const apiFilters = await new APIFilters(Post.find(), req.query)
    .search()
    .filter()
    .sort()

  let posts = await apiFilters.query

  const filteredPostsCount = posts.length

  apiFilters.pagination(postsPerPage);

  posts = await apiFilters.query.clone()

  res.status(200).json({ 
    postsPerPage,
    postsCount,
    filteredPostsCount,
    posts: posts
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
    const { name, strainName, region, city} = req.body
    const searchedFields = `${name}&${strainName}&${region}&${city}`
    const payload = {...req.body, searchedFields}
    const post = await Post.create(payload)
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
  try {
    const post = await Post.findByIdAndUpdate(req.query.id, req.body)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(200).json({ changed: req.body })
  } catch (error) {
    res.status(500).json({ error })
  }
}
