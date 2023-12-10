'use client'
import Link from 'next/link'
import axios from 'axios'

import Post from '@/components/post'

const PostList = ({ postsList }) => {

  // TEST AUTH MIDDLEWARE
  const createPost = async () => {
    const body = {
        author: "Doktor Ziółko",
        date: "2023-09-21T23:48:28.000Z",
        name: "Mamy to!!!!",
        region: "mazowieckie",
        city: "Warszawa",
        adress: "Stacja Metro A-13 Centrum, Lok. Nr 1049, 00-110 Warszawa, Poland",
        placeId: "ChIJg2WlYPkvGUcRdWRv6Pvf2ww",
        price: 323.33,
        amount: 5
    }

    try {
      const  { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, body)

      console.log(data) 
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  return (
    <>
      <button type="button" onClick={createPost}>create post</button>
      <ul>
        {postsList && postsList.map((post, index )=> 
          <Link href={`post/${post._id}`} passHref key={`post_${index}`}>
            <Post post={post} />
          </Link>
        )}
      </ul> 
    </>
  )
}

export default PostList
