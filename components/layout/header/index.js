'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useContext} from 'react'
import { jwtDecode } from 'jwt-decode'

import UserContext from '@/context/user-context'
import userIcon from '@/public/icons/user.svg'
import loginIcon from '@/public/icons/login.svg'
import backIcon from '@/public/icons/back.svg'
import IconButton from '../../UI/icon-button'
import Logo from '../logo'

import styles from './header.module.scss'

const Header = () => {
  const { userToken } = useContext(UserContext)
  const pathName = usePathname()
  const { back } = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo />
        {pathName !== '/' ? (
          <IconButton
            width={30}
            height={30}
            padding="8px"
            icon={backIcon}
            alt="back icon"
            priority
            action={() => back()}
          />
        ) : (
          userToken ? 
            (<Link href={`/user/${jwtDecode(userToken).id}`}>
              <IconButton
                width={40}
                height={40}
                icon={userIcon}
                alt="user icon"
                priority
              />
            </Link>) : 
            (<Link className={styles.loginLink} href="/login" passHref>
              <IconButton
                width={38}
                height={38}
                icon={loginIcon}
                alt="user icon"
                priority
              />
            </Link>
            )
        )}
      </div>

    </div>
  )
}

export default Header
