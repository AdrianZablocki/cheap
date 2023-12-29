'use client'

import { useContext, useEffect, useState } from 'react'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'
import CreateNewPost from '../create-new-post'

import styles from './post-list.module.scss'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)

  useEffect(() => {
    const fetchData = async() => {
      setOpenSpinner(true)
      try {
        const postsData = await getPosts()
        setPosts(postsData.posts)
        setOpenSpinner(false)
      } catch (error) {
        console.log(error)
        setOpenSpinner(false)
      }
      
    } 
    fetchData()
  }, [])

  return (
    <>
      <CreateNewPost posts={posts} setPosts={setPosts} />
      <ul className={styles.grid}>
        {posts && posts.map((post, index )=> 
          // <Link href={`post/${post._id}`} passHref key={`post_${index}`}>
            <Post key={`post_${index}`} post={post} />
          // </Link>
        )}
      </ul>
    </>
  )
}

export default PostList
