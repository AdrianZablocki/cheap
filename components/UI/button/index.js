import styles from './button.module.scss'

const Button = ({ action, buttonType, disabled, text, width }) => (
  <button
    className={`${styles.button} ${styles[buttonType]}`}
    disabled={disabled}
    onClick={action}
    style={{ width: `${width}px`}}
  >
    {text}
  </button>
)

export default Button
