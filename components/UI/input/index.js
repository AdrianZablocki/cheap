import styles from './input.module.scss'

const Input = ({ id, type, value, onChange, onFocus, placeholder, label, min, error, autoComplete, name, onBlur }) => {
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <div className={`${styles.inputWrapper} ${error ? styles.errorBorder : ''}`}>
        <input
          id={id}
          name={name}
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          min={min}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </fieldset>
  )
}

export default Input
