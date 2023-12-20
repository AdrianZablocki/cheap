'use client'

import { useEffect, useState } from 'react'
import { debounceTime, map, tap, distinctUntilChanged } from 'rxjs/operators'
import { fromEvent, Subject } from 'rxjs'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'
import Modal from '../../layout/modal'
import IconButton from '../icon-button'
import { getPosts } from '@/utils'
import Post from '@/components/post'

const SearchBar = () => {
  const [queryName, setQueryName] = useState('')
  const [debouncedName, setDebouncedName] = useState('')
  const [onSearch$] = useState(()=>new Subject())
  const [showModal, setShowModal] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const subscription = onSearch$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(a => {
        console.log(a)
        fetch(a)
        // const test = await getPosts(`keyword=${a}`)
      })
    ).subscribe(setDebouncedName);
  }, [])

  const fetch = async(query) => {
    try {
      const res = await getPosts(`keyword=${query}`)
      setPosts(res.posts)
      console.log(res.posts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = e => {
    setQueryName(e.target.value)
    onSearch$.next(e.target.value)
  }

  const onClear = () => {
    setQueryName('')
    setPosts([])
  }
  
  return (
    <>
      <IconButton
        priority
        icon={searchIcon}
        alt="search"
        text="Wyszukaj nazwę suszu lub miejsce"
        padding="8px 20px"
        color="#000"
        bgColor="#A3EF97"
        borderRadius="50px"
        action={() => setShowModal(true)}
      />
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.searchInModal}>
            <input
              type="text"
              value={queryName}
              placeholder="Wyszukaj nazwę suszu lub miejsce"
              onChange={handleSearch}
            />
            <div className={styles.clearButton}>
              <IconButton
                priority
                icon={searchIcon}
                alt="clear"
                action={onClear}
              />              
            </div>
          </div>
          <div className={styles.post}>
            {posts.length && posts.map(post => <Post key={`searched-post-${post._id}`} post={post} /> )}
          </div>
          {/* <p>Debounced: {debouncedName} {queryName}</p> */}
          {/* {Boolean(posts.length) && <div className={styles.note}>Niestety nic nie znaleźliśmy, spróbuj coś innego</div>} */}
          
        </Modal>
      }
    </>
  )
}

export default SearchBar
