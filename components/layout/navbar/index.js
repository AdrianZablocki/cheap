'use client'

import { useRouter } from 'next/navigation'

import styles from './navbar.module.css'

import Auth from '@/components/auth'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className={styles.navbar}>
      <button type="button" onClick={() => router.back()}>GO BACK</button>
      <Auth />
    </div>
  )
}

export default Navbar
