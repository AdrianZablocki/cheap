import styles from './button.module.scss'

const Button = ({ bgColor, text, action }) => (
  <button  className={`${styles.button} ${styles[bgColor]}`} onClick={action}>{text}</button>
)

export default Button
