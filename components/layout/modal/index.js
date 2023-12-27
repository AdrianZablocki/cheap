'use client'

import { useContext } from 'react'
import { createPortal } from 'react-dom'

import SpinnerContext from '@/context/spinner-context'
import closeIcon from '@/public/icons/close.svg'
import IconButton from '../../UI/icon-button'
import styles from './modal.module.scss'
import Spinner from '../spinner'
import { setDisabledScroll } from '@/utils'

const Modal = ({ onClose, children, title }) => {
  setDisabledScroll(true)
  const { openSpinner } = useContext(SpinnerContext)
  
  const handleCloseClick = (e) => {
    e.preventDefault()
    setDisabledScroll(false)
    onClose()
  }

  const modalContent = (
    <div className={styles.modalWrapper}>
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
        <Spinner isOpen={openSpinner} background="rgba(0, 0, 0, .5)" />
      </div>      
    </div>

  )

  return createPortal(
      modalContent,
      document.getElementById("modal-root")
  )
}

export default Modal
