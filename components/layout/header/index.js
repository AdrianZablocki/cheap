'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import UserContext from '@/context/user-context'
import userIcon from '@/public/icons/user.svg'
import Logo from '../logo'
import Modal from '../modal'

import styles from './header.module.scss'
import IconButton from '../../UI/icon-button'

const Header = () => {
  const [ showModal, setShowModal ] = useState(false)
  const { userToken } = useContext(UserContext)
  const { push } = useRouter();

  const onUserIcon = () => userToken ? setShowModal(true) : push('/login')

  return (
    <div className={styles.wrapper}>
      <Logo />
      <IconButton
        width={40}
        height={40}
        icon={userIcon}
        alt="logo"
        priority
        action={() => onUserIcon()}
      />
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          user, links, login, logout, etc...
        </Modal>
      }
    </div>
  )
}

export default Header
