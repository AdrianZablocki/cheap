'use client'

import { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { getPosts, setDisabledScroll } from '@/utils'
import Post from '@/components/post'
import SpinnerContext from '@/context/spinner-context'
import QueryBuilder from '@/utils/requests/query-builder'
import prevIcon from '@/public/icons/prev.svg'
import nextIcon from '@/public/icons/next.svg'
import Navbar from '../layout/navbar'

import styles from './post-list.module.scss'
import IconButton from '../UI/icon-button'

const PostList = () => {
  const [ posts, setPosts ] = useState()
  const [ pageCount, setPageCount] = useState(1)
  const [ page, setPage ] = useState(0)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const [ keyword, setKeyword ] = useState()
  const [ filters, setFilters ] = useState({region: '', strainName: '', city: ''})
  const [ sort, setSort ] = useState({ sortBy: 'date', sortDir: -1 })

  useEffect(() => {
    const query = new QueryBuilder()
      .withPagination(page + 1)
      .withKeyword(keyword)
      .withFilters(filters)
      .withSort(sort)
      .build()
      
    setDisabledScroll(false)

    const fetchData = async() => fetchPosts(query)
    fetchData()
  }, [keyword, page, filters])

  const fetchPosts = async(query) => {
    setOpenSpinner(true)
    setPosts([])
    try {
      const postsData = await getPosts(query ? query : '')
      setPosts(postsData.posts)
      setPageCount(Math.ceil(postsData.filteredPostsCount/postsData.postsPerPage))
      setOpenSpinner(false)
    } catch (error) {
      setOpenSpinner(false)
    }
  }


  const handlePageClick = (event) => setPage(event.selected)

  return (
    <>
      <Navbar
        setKeyword={setKeyword}
        handlePageClick={handlePageClick}
        setFilters={setFilters}
        filters={filters}
        sort={sort}
        setSort={setSort}
      />

      <ul className={styles.grid}>
        {posts && posts.map((post, index )=> <Post key={`post_${index}`} post={post} />)}
      </ul>

      {<ReactPaginate
        forcePage={page}
        className="pagination"
        pageRangeDisplayed={3}
        pageCount={pageCount}
        breakLabel="..."
        nextLabel={<IconButton 
          width={30}
          height={30}
          icon={nextIcon}
          alt="close icon"
        />}
        previousLabel={<IconButton 
          width={30}
          height={30}
          icon={prevIcon}
          alt="close icon"
        />}
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
      />}    
    </>
  )
}

export default PostList
