import styles from './button.module.scss'

const Button = ({ bgColor, text, action, disabled }) => (
  <button
    className={`${styles.button} ${styles[bgColor]}`}
    disabled={disabled}
    onClick={action}
  >
    {text}
  </button>
)

export default Button
