import styles from './input.module.scss'

const Input = ({ id, type, value, onChange, onFocus, placeholder, label, min, error, autoComplete }) => {
  console.log(error)
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          min={min}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </fieldset>
  )
}

export default Input
