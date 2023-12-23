'use client'

import { useRouter } from 'next/navigation'

import closeIcon from '@/public/icons/close.svg'
import { setDisabledScroll } from '@/utils'
import Button from '../UI/button'
import IconButton from '../UI/icon-button'

import styles from './mail-confirmation-popup.module.scss'

const MailConfirmationPopup = ({ openPopup, setOpenPopup }) => {
  const { push } = useRouter()

  if (openPopup) {
    setDisabledScroll(true)
  }

  const onClose = () => {
    setDisabledScroll(false)
    setOpenPopup(false)
    push('/')
  }

  return (
    <div className={`${styles.wrapper} ${ openPopup ? styles.openPopup : '' }`}>
      <div className={styles.content}>
        <span className={styles.header}>
          <IconButton
            icon={closeIcon}
            alt="closeIcon"
            action={onClose}
          />        
        </span>
        <p>
          Aby zakończyć proces rejestracji kliknij w link aktywacyjny, który wysłaliśmy na Twój adres mailowy.
        </p>
        <Button text="Dzięki!" action={() => onClose()} />           
      </div>
    </div>
  )
}

export default MailConfirmationPopup
