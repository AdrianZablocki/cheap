import PostList from '@/components/posts-list'

import { getPosts } from '@/utils'
import styles from './page.module.scss'
// import AutocompleteMap from '@/components/autocomplete-map'

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