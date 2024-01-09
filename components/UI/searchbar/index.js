'use client'

import { useEffect, useState } from 'react'
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators'
import { Subject } from 'rxjs'

import closeIcon from '@/public/icons/close.svg'
import IconButton from '../icon-button'

import styles from './searchbar.module.scss'

const SearchBar = ({ setKeyword, handlePageClick }) => {
  const [ queryName, setQueryName ] = useState('')
  const [ debouncedName, setDebouncedName ] = useState('')
  const [ onSearch$ ] = useState(()=>new Subject())

  useEffect(() => {
    const subscription = onSearch$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(query => setKeyword(query))
    ).subscribe(setDebouncedName);
  }, [])

  const handleSearch = e => {
    handlePageClick({selected: 0})
    setQueryName(e.target.value)
    onSearch$.next(e.target.value)
  }

  const onClear = () => {
    handlePageClick({selected: 0})
    setKeyword('')
    setQueryName('')
    onSearch$.next('')
  }
  
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={queryName || ''}
        placeholder="Szukaj"
        onChange={(e) => handleSearch(e)}
      />
      {queryName && 
        <div className={styles.clearButton}>
          <IconButton
            width={12}
            height={12}
            priority
            icon={closeIcon }
            alt="clear icon"
            action={onClear}
          />              
        </div>
      }
    </div>
  )
}

export default SearchBar
