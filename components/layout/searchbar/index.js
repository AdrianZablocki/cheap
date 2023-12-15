'use client'

import { useState } from 'react'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'
import Modal from '../modal'
import IconButton from '../icon-button'

const SearchBar = () => {
  const [showModal, setShowModal] = useState(false)
  
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
            <input type="text" placeholder="Wyszukaj nazwę suszu lub miejsce" />
          </div>
          <div className={styles.note}>searched places list / not found</div>
        </Modal>
      }
    </>
  )
}

export default SearchBar
