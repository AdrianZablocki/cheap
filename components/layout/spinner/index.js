'use-client'

import styles from './spinner.module.scss'

const Spinner = ({background, isOpen}) => (
  <div className={styles.spinnerWrapper} style={{backgroundColor: background, display: `${isOpen ? 'flex' : 'none'}`}}>
    <div className={styles.customLoader}></div>    
  </div>
)

export default Spinner