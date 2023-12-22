import { cookies } from 'next/headers'

import PostList from '@/components/posts-list'

import styles from './page.module.scss'

const HomePage = async() => {
  const token = cookies().get('token')

  return (
    <main className={styles.main}>
      <PostList token={token?.value} />
    </main>
  )
}

export default HomePage
