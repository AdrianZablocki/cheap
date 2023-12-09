'use client'
import Link from 'next/link'

import Post from '@/components/post'

const PostList = ({ postsList }) => {

  return (
    <ul>
      {postsList && postsList.map((post, index )=> 
        <Link href={`post/${post._id}`} passHref key={`post_${index}`}>
          <Post post={post} />
        </Link>
      )}
    </ul>
  )
}

export default PostList
