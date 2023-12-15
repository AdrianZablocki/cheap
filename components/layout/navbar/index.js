'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

import filtersIcon from '@/public/icons/filters.svg'
import SearchBar from '../searchbar'

import styles from './navbar.module.scss'

const Navbar = () => {
  const router = useRouter()

  const onFilters = () => console.log('open filters modal')

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <SearchBar />

        <div className={styles.actionButtons}>
          <button type="button" onClick={onFilters}>
            <Image
              width={40}
              height={40}
              src={filtersIcon}
              alt="search"
            />       
          </button>          
        </div>
      {/* 
          <button type="button" onClick={() => router.back()}>GO BACK</button>
          <Link href="/logout" passHref>Wyloguj</Link>
          <Link href="/login" passHref>Zaloguj</Link> 
      */}
      </div>
    </div>

  )
}

export default Navbar
