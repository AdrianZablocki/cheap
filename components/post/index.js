'use client'

const Post = ({posts}) => {
  return (
  <>
    {posts && posts.map((post, index) =><div key={`post_${index}`}>{post.name}</div>)}
  </>
  )
}

export default Post