'use client'

import { useRouter } from 'next/navigation'

import styles from './navbar.module.css'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className={styles.navbar}>
      <button type="button" onClick={() => router.back()}>GO BACK</button>
    </div>
  )
}

export default Navbar
