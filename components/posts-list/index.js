'use client'

import { useContext, useEffect, useState } from 'react'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'

import styles from './post-list.module.scss'
import Link from 'next/link'

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
    <ul className={styles.grid}>
      {posts && posts.map((post, index )=> <Post key={`post_${index}`} post={post} />)}
    </ul>
  )
}

export default PostList
