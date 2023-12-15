'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import styles from './modal.module.scss'

const Modal = ({ onClose, children, title }) => {
    const handleCloseClick = (e) => {
      e.preventDefault()
      onClose()
    }

    const modalContent = (
      <div className={styles.modal}>
          <div className={styles.modalHeader}>
              <a href="#" onClick={handleCloseClick}>
                  x
              </a>
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
