'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useContext} from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import userIcon from '@/public/icons/user.svg'
import backIcon from '@/public/icons/back.svg'
import IconButton from '../../UI/icon-button'
import Logo from '../logo'

import styles from './header.module.scss'

const Header = () => {
  const { userToken } = useContext(UserContext)
  const pathName = usePathname()

  const url = userToken ? `/user/${jwtDecode(userToken).id}` : '/refresh?location=/'
  return (
    <div className={styles.wrapper}>
      <Logo />
      {pathName.includes('user') ? (
        <Link href="/">
          <IconButton
            width={30}
            height={30}
            padding="8px"
            icon={backIcon}
            alt="back icon"
            priority
          />
        </Link>
      ) : (
        <Link href={url}>
          <IconButton
            width={40}
            height={40}
            icon={userIcon}
            alt="user icon"
            priority
          />
        </Link>
      )}
    </div>
  )
}

export default Header
