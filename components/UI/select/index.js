import styles from './select.module.scss'

const Select = ({ id, label, placeholder, options, onChange }) => {

  return (
    <fieldset className={styles.select}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.selectWrapper}>
        <select id={id} onChange={onChange}>
          <option value="">{placeholder}</option>
          {options && options.map((option, index) =>  
            <option 
              key={`opton-${id}-${option.valu}-${index}`} 
              value={option.value}>{option.value}
            </option>
          )}
        </select>
      </div>
      
    </fieldset>
  )
}

export default Select
