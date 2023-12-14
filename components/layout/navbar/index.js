'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import styles from './navbar.module.scss'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className={styles.navbar}>
      
      <button type="button" onClick={() => router.back()}>GO BACK</button>

   
          <Link href="/logout" passHref>Wyloguj</Link>
          <Link href="/login" passHref>Zaloguj</Link>
  
    </div>
  )
}

export default Navbar
