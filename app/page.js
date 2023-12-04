import axios from 'axios'
import queryString from 'query-string'

import styles from './page.module.css'
import Post from '@/components/post'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const HomePage = async() => {
  let postsData;
  try {
    postsData = await getPosts()
    console.log('DATA', postsData)
  } catch(error) {
    console.log('ERROR', error)
  }

  return (
    <main className={styles.main}>
      main
      <Post posts={postsData.posts} />
    </main>
  )
}

export default HomePage;