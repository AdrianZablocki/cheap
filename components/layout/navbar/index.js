'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './navbar.module.scss'
import SearchBar from '../searchbar'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <SearchBar />
      {/* <button type="button" onClick={() => router.back()}>GO BACK</button>
          <Link href="/logout" passHref>Wyloguj</Link>
          <Link href="/login" passHref>Zaloguj</Link> */}
      </div>
    </div>

  )
}

export default Navbar
