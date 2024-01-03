'use client'

import Link from 'next/link'
import { useContext} from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import userIcon from '@/public/icons/user.svg'
import IconButton from '../../UI/icon-button'
import Logo from '../logo'

import styles from './header.module.scss'

const Header = () => {
  const { userToken } = useContext(UserContext)

  return (
    <div className={styles.wrapper}>
      <Logo />
      {userToken && 
        <Link href={`/user/${jwtDecode(userToken).id}`}>
          <IconButton
            width={40}
            height={40}
            icon={userIcon}
            alt="logo"
            priority
          />
        </Link>
      }
    </div>
  )
}

export default Header
