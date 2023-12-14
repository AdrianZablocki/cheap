import axios from 'axios'
import PostList from '@/components/posts-list'

import styles from './page.module.scss'
// import AutocompleteMap from '@/components/autocomplete-map'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const HomePage = async() => {
  const postsData = await getPosts()

  return (
    <main className={styles.main}>
      {/* <AutocompleteMap /> */}
      <PostList postsList={postsData.posts} />
    </main>
  )
}

export default HomePage;