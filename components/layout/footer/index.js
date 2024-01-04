import Link from 'next/link'

import styles from './footer.module.scss'

const Footer = ({}) => {
  return (
    <footer className={styles.footerWrapper}>
      <Link href="/create-post" passHref>Utwórz wpis</Link>
    </footer>
  )
} 
export default Footer
