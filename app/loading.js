import styles from '../components/layout/spinner/spinner.module.scss'

const LoadingPage = () => 
  <div className={styles.spinnerWrapper}>
    <div className={styles.customLoader}></div>    
  </div>

export default LoadingPage
