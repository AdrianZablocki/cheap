import styles from './input.module.scss'

const Input = ({ type, value, onChange, placeholder, label, min, error, fieldClass }) => {
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <div className={`${styles.inputWrapper} ${styles[fieldClass]}`}>
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          min={min}
          onChange={onChange}
        />
      </div>
      {error && <div>{error}</div>}
    </fieldset>
  )
}

export default Input
