import Button from '@/components/UI/button'
import closeIcon from '@/public/icons/close.svg'

import styles from './dialog.module.scss'
import IconButton from '@/components/UI/icon-button'

const Dialog = ({ closeDialog, action }) => {
  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <IconButton
            icon={closeIcon}
            alt="close icon"
            action={() => closeDialog()}
          />
        </div>
      
      <div className={styles.content}>Czy na pewno chcesz usunąć wpis?</div>

        <div className={styles.actions}>
          <Button text="ok" type="button" buttonType="success" action={() => action()} />
          <Button text="anuluj" type="button" buttonType="error" action={() => closeDialog(false)} />
        </div>        
      </div>
    </div>
  )
}

export default Dialog
