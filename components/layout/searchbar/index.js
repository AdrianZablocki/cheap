'use client'
import Image from 'next/image'
import { useState } from 'react'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'
import Modal from '../modal'

const SearchBar = () => {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div className={styles.searchbar}>
      <div className={styles.search} onClick={() => setShowModal(true)}>
        Wyszukaj nazwę suszu lub miejsce
        <Image
          className={styles.searchIcon}
          priority
          src={searchIcon}
          alt="search"
        />
      </div>
      
      {showModal &&
        <Modal onClose={() => setShowModal(false)} title={'to jest modal - dynamic title'}>
          Hello from the modal - dynamic content!
          <input className={styles.search} type="text" placeholder="Wyszukaj nazwę suszu lub miejsce" />
        </Modal>
      }
    </div>
  )
}

export default SearchBar
