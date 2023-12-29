'use client'

import { useContext, useEffect, useState } from 'react'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import UserContext from '@/context/user-context'
import SpinnerContext from '@/context/spinner-context'

import styles from './post-list.module.scss'
import CreateNewPost from '../create-new-post'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)

  useEffect(() => {
    const fetchData = async() => {
      test()
      // setOpenSpinner(true)
      // try {
      //   const postsData = await getPosts()
      //   setPosts(postsData.posts)
      //   setOpenSpinner(false)
      // } catch (error) {
      //   console.log(error)
      //   setOpenSpinner(false)
      // }
      
    } 
    fetchData()
  }, [])

  const test = async() => {
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
      <div>
        <CreateNewPost posts={posts} setPosts={setPosts} />
      </div>
    </>
  )
}

export default PostList
