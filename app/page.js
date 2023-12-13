import axios from 'axios'

import PostList from '@/components/posts-list'

import styles from './page.module.css'

const getPosts = async () => {
  const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)

  return data
}

const setValidationFlag = async (userId, user) => {
  const  { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, user)

  return data
}

const HomePage = async({ searchParams }) => {
  const postsData = await getPosts();

  console.log('search param', searchParams)
  if (searchParams?.verified === 'true' && searchParams?.userId) {
    try {
      const res = await setValidationFlag(searchParams.userId, { verified: true}) 
      console.timeLog('verification success', res)
    } catch (error) {
      console.log('Verifications failed', error)
    }
  }

  return (
    <main className={styles.main}>
      <PostList postsList={postsData.posts} />
    </main>
  )
}

export default HomePage;