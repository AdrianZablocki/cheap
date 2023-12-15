'use client'
import Image from 'next/image'
import { useState } from 'react'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'
import Modal from '../modal'

const SearchBar = () => {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <>
      <button type="button" className={styles.search} onClick={() => setShowModal(true)}>
        Wyszukaj nazwę suszu lub miejsce
        <Image
          className={styles.searchIcon}
          priority
          src={searchIcon}
          alt="search"
        />
      </button>
      
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.searchInModal}>
            <input type="search" placeholder="Wyszukaj nazwę suszu lub miejsce" />
          </div>
          <div>searched places list / not found</div>
        </Modal>
      }
    </>
  )
}

export default SearchBar
