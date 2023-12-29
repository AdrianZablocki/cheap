'use client'

import usePlacesAutocomplete from 'use-places-autocomplete'

import styles from './autocomplete.module.scss'

const PlacesAutocomplete = ({ onAddressSelect, selectedValue, setSelectedValue }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: 'pl' } },
    debounce: 300,
    cache: 86400
  })

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description
      } = suggestion

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false)
            clearSuggestions()
            onAddressSelect && onAddressSelect(description, place_id)
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div>
      <fieldset className={styles.input}>
        <label>Wyszukaj aptekę:</label>
        <div className={styles.inputWrapper}>
          <input
            value={value || selectedValue}
            onChange={(e) => {
              setValue(e.target.value)
              !e.target.value ? setSelectedValue('drugStore', undefined) : null
            }}
            onFocus={() => {
              setValue('')
            }}
            placeholder="Zacznij wpisywać adres"
            autoFocus 
            type="text"
          />
        </div>
      </fieldset>

      {status === 'OK' && (
        <ul>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete
