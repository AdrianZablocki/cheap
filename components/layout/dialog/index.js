import Button from '@/components/UI/button'
import closeIcon from '@/public/icons/close.svg'

import styles from './dialog.module.scss'
import IconButton from '@/components/UI/icon-button'

const Dialog = ({ onClose, confirmAction, confirmText, moreAction, content }) => {
  return (
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialog}>
        {!moreAction &&
          <div className={styles.header}>
            <IconButton
              icon={closeIcon}
              alt="close icon"
              action={() => onClose()}
            />
          </div>
        }
      
        <div className={`${moreAction ? styles.content : styles.contentWithPadding}`}>{content}</div>

        <div className={`${styles.actions} ${moreAction ? styles.moreActions : ''}`}>
          <Button text={confirmText || 'ok'} type="button" buttonType="success" action={() => confirmAction()} />
          {!moreAction && <Button text="anuluj" type="button" buttonType="error" action={() => onClose(false)} />}
          {moreAction &&
            <Button text="Dowiedz się więcej" type="button" buttonType="neutral" action={() => moreAction()} />
          }
        </div>        
      </div>
    </div>
  )
}

export default Dialog
