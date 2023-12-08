import axios from 'axios'

import styles from './page.module.css'
import Post from '@/components/post'
import Map from '@/components/map'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const HomePage = async({params: { session, ...params}}) => {
  const postsData = await getPosts();

  return (
    <main className={styles.main}>
      <Post posts={postsData.posts} session={session} />
      <Map />
    </main>
  )
}

export default HomePage;