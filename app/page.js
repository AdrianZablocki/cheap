import axios from 'axios'

import styles from './page.module.css'
import PostList from '@/components/posts-list'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const HomePage = async() => {
  const postsData = await getPosts();

  return (
    <main className={styles.main}>
      <PostList postsList={postsData.posts} />
    </main>
  )
}

export default HomePage;