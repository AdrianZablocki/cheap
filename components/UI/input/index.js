import styles from './input.module.scss'

const Input = ({ type, value, onChange, placeholder, label, min, error }) => {
  return (
    <fieldset className={styles.input}>
      <label>{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        min={min}
        onChange={onChange}
      />
      {error && <div>{error}</div>}
    </fieldset>
  )
}

export default Input
