'use client'

import { useState } from 'react'

import styles from './searchbar.module.scss'
import searchIcon from '@/public/icons/search.svg'
import Modal from '../modal'
import IconButton from '../../UI/icon-button'

const SearchBar = () => {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  const onSearch = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const onClear = (e) => {
    setSearch('')
    e.target.value = ''
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
              value={search}
              placeholder="Wyszukaj nazwę suszu lub miejsce"
              onChange={(e) => onSearch(e)}
            />
            <div className={styles.clearButton}>
              <IconButton
                priority
                icon={searchIcon}
                alt="clear"
                action={(e) => onClear(e)}
              />              
            </div>
          </div>
          <div className={styles.note}>searched places list / not found {search}</div>
        </Modal>
      }
    </>
  )
}

export default SearchBar
