'use client'

import { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'
import Navbar from '../layout/navbar'

import styles from './post-list.module.scss'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const [ pageCount, setPageCount] = useState()
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
      setPageCount(Math.round(postsData.postsCount/postsData.postsPerPage))
      setOpenSpinner(false)
    } catch (error) {
      console.log(error)
      setOpenSpinner(false)
    }
  }


  const handlePageClick = (event) => {
    fetchPosts(`page=${event.selected + 1}`)
  }

  return (
    <>
      <Navbar onSearch={fetchPosts} />
      <ul className={styles.grid}>
        {posts && posts.map((post, index )=> <Post key={`post_${index}`} post={post} />)}
      </ul>

      <ReactPaginate
        className="pagination"
        pageRangeDisplayed={5}
        pageCount={pageCount}
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
      />    
    </>
  )
}

export default PostList
