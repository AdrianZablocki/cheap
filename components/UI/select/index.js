import styles from './select.module.scss'

const Select = ({ id, label, placeholder, options, onBlur, onChange, value, onFocus, error }) => {

  return (
    <fieldset className={styles.select}>
      <label htmlFor={id}>{label}</label>
      <div className={`${styles.selectWrapper} ${error ? styles.errorBorder : ''}`}>
        <select id={id} onBlur={onBlur} onChange={onChange} onFocus={onFocus} defaultValue={value}>
          <option value="">{placeholder}</option>
          {options && options.map((option, index) =>  
            <option 
              key={`opton-${id}-${option.valu}-${index}`} 
              value={option.value}>{option.value}
            </option>
          )}
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </fieldset>
  )
}

export default Select
