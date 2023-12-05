import axios from 'axios'

import styles from './page.module.css'
import Post from '@/components/post'
import LoadGoogleMapsScript from '@/components/autocomplete'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const HomePage = async() => {
  // const postsData = await getPosts();

  return (
    <main className={styles.main}>
      main
      <LoadGoogleMapsScript />
      {/* <Post posts={postsData.posts} /> */}
    </main>
  )
}

export default HomePage;