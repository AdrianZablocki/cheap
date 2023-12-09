'use client'

import Map from '../map'
import styles from './post.module.css'

const Post = ({ post, isFullPost }) => {

  return (
    <div className={styles.post}>
      {post.name}
      {isFullPost && <Map mapCenter={{lat: 27.672932021393862, lng: 85.31184012689732}} />}
      <button>edit</button>
    </div>
  )
}

export default Post
