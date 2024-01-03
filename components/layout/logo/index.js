import Link from 'next/link'
import styles from './logo.module.scss'

const Logo = () => (
  <h1 className={styles.logo}>
    <Link href="/" passHref>
      <div>chea<span>p</span></div>
      <div className={styles.weed}>wee<span>d</span></div>    
    </Link>
  </h1>
)

export default Logo
