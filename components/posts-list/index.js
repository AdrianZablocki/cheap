'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'

import styles from './post-list.module.scss'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { push } = useRouter()
  const pathName = usePathname()

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
  
  // TODO TEST AUTH MIDDLEWARE - remove after implement it
  // const createPost = async () => {
  //   const body = {
  //       author: "Doktor Ziółko",
  //       date: "2023-09-21T23:48:28.000Z",
  //       name: "Mamy to!!!!",
  //       region: "mazowieckie",
  //       city: "Warszawa",
  //       adress: "Stacja Metro A-13 Centrum, Lok. Nr 1049, 00-110 Warszawa, Poland",
  //       placeId: "ChIJg2WlYPkvGUcRdWRv6Pvf2ww",
  //       price: 323.33,
  //       amount: 5
  //   }

  //   try {
  //     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, body)

  //   } catch (error) {
  //     console.log('ERROR', error)
      
  //     if (error.response.status === 403 || error.response.status === 401 || error.response.status === 405) {
  //       console.log('CREATE POST', pathName)
  //       push(`/refresh?location=${pathName}`)
  //     }
  //   }
  // }

  return (
    <>
      {/* <button type="button" onClick={createPost}>create post</button> */}
  
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
