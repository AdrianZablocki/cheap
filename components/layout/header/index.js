'use client'

import { useState } from 'react'

import userIcon from '@/public/icons/user.svg'
import Logo from '../logo'
import Modal from '../modal'

import styles from './header.module.scss'
import IconButton from '../icon-button'

const Header = ({ logoWidth, logoHeight }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={styles.wrapper}>
      <h1 aria-label="Cheap weed">
        <Logo width={logoWidth} height={logoHeight} />
        <span className={styles.title}>Cheap weed</span>
      </h1>
      <IconButton
        width={40}
        height={40}
        icon={userIcon}
        alt="logo"
        priority
        action={() => setShowModal(true)}
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
