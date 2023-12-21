import styles from './input.module.scss'

const Input = ({ type, value, onChange, onFocus, placeholder, label, min, error }) => {
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          min={min}
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
      {error && <div>{error}</div>}
    </fieldset>
  )
}

export default Input
