import Link from 'next/link'

import styles from './footer.module.scss'

const Footer = ({}) => {
  return (
    <footer className={styles.footerWrapper}>
      <Link className={styles.about} href="/about" passHref>O nas</Link>
      <Link className={styles.createPost} href="/create-post" passHref>Utwórz wpis</Link>
    </footer>
  )
} 
export default Footer
