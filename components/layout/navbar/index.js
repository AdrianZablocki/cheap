'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContext } from 'react'

import AuthContext from '@/context/auth-context'

import styles from './navbar.module.css'

const Navbar = () => {
  const router = useRouter()
  const { authenticated } = useContext(AuthContext)
  console.log('navbar', authenticated)

  return (
    <div className={styles.navbar}>
      <button type="button" onClick={() => router.back()}>GO BACK</button>

      {
        authenticated 
          ? <Link href="/logout" passHref>Wyloguj</Link>
          : <Link href="/login" passHref>Zaloguj</Link>
      }
    </div>
  )
}

export default Navbar
