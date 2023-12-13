'use client'

import Link from 'next/link'

import styles from './welcome-screen.module.css'

const WelcomeScreen = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>
      <span className={styles.welcome}>Witaj w</span>
      <span className={styles.cheap}>Chea<span className={styles.green}>p</span></span>
      <span className={styles.weed}>Wee<span className={styles.green}>d</span></span>
    </h1>

    <h2 className={styles.subtitle}>NASZYM wspólnym celem jest zakup medycznego suszu w najlepszej cenie</h2>
    
    <div className={styles.actions}>
      <Link href="/login" passHref>LOGOWANIE</Link>
      <Link href="registration" passHref>REJESTRACJA</Link>
      <Link href="/" passHref>POMIŃ</Link>
    </div>
  </div>
)

export default WelcomeScreen
