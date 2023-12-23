import { useRouter } from 'next/navigation'

import IconButton from '../UI/icon-button'
import closeIcon from '@/public/icons/close.svg'

import styles from './mail-confirmation-popup.module.scss'
import Button from '../UI/button'

const MailConfirmationPopup = ({ openPopup, setOpenPopup }) => {
  const { push } = useRouter()

  const onClose = () => {
    setOpenPopup(false)
    push('/')
  }

  return (
    <div className={`${styles.wrapper} ${ openPopup ? styles.openPopup : '' }`}>
      <div className={styles.header}>
        <IconButton
          icon={closeIcon}
          alt="closeIcon"
          action={onClose}
        />        
      </div>
      <p>
        Aby zakończyć proces rejestracji kliknij w link aktywacyjny, który wysłaliśmy na Twój adres mailowy.
      </p>
   
      <Button text="Dzięki!" action={() => onClose()} />       
     
    </div>
  )
}

export default MailConfirmationPopup
