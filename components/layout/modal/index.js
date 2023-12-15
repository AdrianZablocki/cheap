'use client'

import Image from 'next/image'
import React from 'react'
import { createPortal } from 'react-dom'

import closeIcon from '@/public/icons/close.svg'
import IconButton from '../icon-button'
import styles from './modal.module.scss'

const Modal = ({ onClose, children, title }) => {
    const handleCloseClick = (e) => {
      e.preventDefault()
      onClose()
    }

    const modalContent = (
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <IconButton
            icon={closeIcon}
            alt="closeIcon"
            action={(e) => handleCloseClick(e)}
          />
        </div>
        {title && <h1>{title}</h1>}
        <div className={styles.modalBody}>{children}</div>
      </div>
    )

    return createPortal(
        modalContent,
        document.getElementById("modal-root")
    )
}

export default Modal
