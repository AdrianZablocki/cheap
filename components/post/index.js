'use client'

import styles from './post.module.css'

const Post = ({ post }) => {

  console.log('post', post)
  return (
      <div className={styles.post}>
        {post.name}
        <button>edit</button>
      </div>
  )
}

export default Post
