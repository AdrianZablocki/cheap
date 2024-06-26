import styles from './snackbar.module.scss'

const SnackbarMessage = ({ isOpen, message, severity }) => {
  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.open : styles.hidden}`}>
      <div 
        className={`${styles.snackbar} ${styles[severity]} ${isOpen ? styles.open : styles.hidden}`} 
      >
        { message }
      </div> 
    </div>

  )
}

export default SnackbarMessage
