import styles from './input.module.scss'

const Input = ({
  autoComplete,
  disabled,
  error,
  id,
  label,
  min,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  type,
  value
}) => {
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <div className={`${styles.inputWrapper} ${error ? styles.errorBorder : ''}`}>
        <input
          autoComplete={autoComplete}
          defaultValue={value}
          disabled={disabled}
          id={id}
          min={min}
          name={name}
          placeholder={placeholder}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </fieldset>
  )
}

export default Input
