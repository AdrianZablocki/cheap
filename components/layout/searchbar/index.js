'use client'
import Image from 'next/image'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'

const SearchBar = () => {
  const onSearch = () => console.log('search action')
  
  return (
    <div className={styles.searchbar}>
      <input type="text" placeholder="Wyszukaj nazwę suszu lub miejsce" />
      <button type="button" className={styles.searchIcon} onClick={onSearch}>
        <Image
          priority
          src={searchIcon}
          alt="search"
        />
      </button>
    </div>
  )
}

export default SearchBar
