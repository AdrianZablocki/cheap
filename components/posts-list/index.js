'use client'

import { useContext, useEffect, useState } from 'react'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'

import styles from './post-list.module.scss'
import Navbar from '../layout/navbar'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)

  useEffect(() => {
    const fetchData = async() => fetchPosts()
    fetchData()
  }, [])

  const fetchPosts = async(query) => {
    setOpenSpinner(true)
    setPosts([])
    try {
      const postsData = await getPosts(query ? query : '')
      setPosts(postsData.posts)
      setOpenSpinner(false)
    } catch (error) {
      console.log(error)
      setOpenSpinner(false)
    }
  }

  return (
    <>
      <Navbar onSearch={fetchPosts} />
      <ul className={styles.grid}>
        {posts && posts.map((post, index )=> <Post key={`post_${index}`} post={post} />)}
      </ul>    
    </>
  )
}

export default PostList
