import Image from 'next/image'

import userIcon from '@/public/icons/user.svg'
import Logo from '../logo'

import styles from './header.module.scss'

const Header = ({ logoWidth, logoHeight }) => (
  <div className={styles.wrapper}>
    <h1 aria-label="Cheap weed">
      <Logo width={logoWidth} height={logoHeight} />
      <span className={styles.title}>Cheap weed</span>
    </h1>
    <Image
      width={40}
      height={40}
      src={userIcon}
      alt="logo"
      priority
    />
  </div>
)

export default Header
