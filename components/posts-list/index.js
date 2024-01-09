'use client'

import { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { getPosts } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'
import Navbar from '../layout/navbar'

import styles from './post-list.module.scss'
import QueryBuilder from '@/utils/requests/query-builder'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const [ pageCount, setPageCount] = useState()
  const [ page, setPage ] = useState(0)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const [ keyword, setKeyword ] = useState()
  // const [ ]

  useEffect(() => {
    const query2 = new QueryBuilder().withPagination(page + 1).withKeyword(keyword).build()
    const fetchData = async() => fetchPosts(query2)
    fetchData()
  }, [keyword, page])

  const fetchPosts = async(query) => {
    console.log('GET')
    setOpenSpinner(true)
    setPosts([])
    try {
      const postsData = await getPosts(query ? query : '')
      setPosts(postsData.posts)
      setPageCount(Math.round(postsData.filteredPostsCount/postsData.postsPerPage))
      setOpenSpinner(false)
    } catch (error) {
      console.log(error)
      setOpenSpinner(false)
    }
  }


  const handlePageClick = (event) => setPage(event.selected)

  return (
    <>
      <Navbar setKeyword={setKeyword} handlePageClick={handlePageClick} />
      <ul className={styles.grid}>
        {posts && posts.map((post, index )=> <Post key={`post_${index}`} post={post} />)}
      </ul>

      {<ReactPaginate
        forcePage={page}
        className="pagination"
        // pageRangeDisplayed={3}
        pageCount={pageCount}
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
      />}    
    </>
  )
}

export default PostList
