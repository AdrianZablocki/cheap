'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import Link from 'next/link'

import filtersIcon from '@/public/icons/filters.svg'
import SearchBar from '../searchbar'
import Modal from '../modal'
import IconButton from '../../UI/icon-button'

import styles from './navbar.module.scss'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <SearchBar />

        <div className={styles.actionButtons}>
          <IconButton
            width={40}
            height={40}
            icon={filtersIcon}
            alt="search"
            action={() => setShowModal(true)}
          />
        </div>
      {/* 
          <button type="button" onClick={() => router.back()}>GO BACK</button>
          <Link href="/logout" passHref>Wyloguj</Link>
          <Link href="/login" passHref>Zaloguj</Link> 
      */}

      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          filters
        </Modal>
      }
      </div>
    </div>

  )
}

export default Navbar
