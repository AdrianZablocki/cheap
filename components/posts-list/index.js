'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'

import { getPosts } from '@/utils'
import Post from '@/components/post'

import styles from './post-list.module.scss'
import { useEffect, useState } from 'react'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const { push } = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    const fetchData = async() => {
      const postsData = await getPosts()
      setPosts(postsData.posts)
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
