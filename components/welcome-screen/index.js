'use client'

import Link from 'next/link'

import styles from './welcome-screen.module.scss'
import Logo from '../layout/logo'

const WelcomeScreen = () => (
  <div className={styles.wrapper}>

    <div className={styles.logo}>
      <div className={styles.title}>WITAJ W</div>
      <Logo width={160} height={80} />
    </div>

    <h2 className={styles.subtitle}>NASZYM wspólnym celem jest zakup medycznego suszu w najlepszej cenie</h2>
    
    <div className={styles.actions}>
      <Link href="/login" passHref>LOGOWANIE</Link>
      <Link href="registration" passHref>REJESTRACJA</Link>
      <Link href="/" passHref>POMIŃ</Link>
    </div>

  </div>
)

export default WelcomeScreen
