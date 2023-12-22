import PostList from '@/components/posts-list'

import styles from './page.module.scss'

const HomePage = async() => {

  return (
    <main className={styles.main}>
      <PostList />
    </main>
  )
}

export default HomePage
