import styles from './snackbar.module.scss'

const SnackbarMessage = ({ isOpen, message, severity }) => {
  return (
    <span className={styles.snackbar} style={{
      opacity: isOpen ? '1' : '0'
    }}>{ message }<span>: { severity }</span></span>
  )
}

export default SnackbarMessage
