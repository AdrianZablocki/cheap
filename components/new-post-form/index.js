import { useMemo,useState } from 'react'
import Input from '../UI/input'
import Select from '../UI/select'
import { inputsConfig, selectsConfig } from './new-post-form.helper'
import Button from '../UI/button'
import AutocompleteMap from '../autocomplete-map'

import { useLoadScript } from '@react-google-maps/api'

const NewPostForm = () => {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  const [ strainName, setStrainName ] = useState({})
  const [ region, setRegion ] = useState({})
  const [ city, setCity ] = useState({})
  const [ price, setPrice ] = useState({})
  const [ amount, setAmount ] = useState({})
  const [ drugStore, setDrugStore ] = useState({})

  const modalContentMap = {
    firstStep: 
      <form>
        {selectsConfig({strainName, setStrainName, region, setRegion}).map(select => 
          <Select
            key={`new-post-form-${select.id}`}
            id={select.id}
            value={select.value[select.id]}
            label={select.label}
            placeholder={select.placeholder}
            options={select.options}
            onChange={(e) => select.action({ [select.id]: e.target.value })}
          />
        )}
        {inputsConfig({price, setPrice, amount, setAmount, city, setCity}).map((input, index) => 
          <Input 
            key={`new-post-form-input-${input.id}-${index}`}
            type={input.type}
            value={input.value[input.id]}
            label={input.label}
            min={input.min}
            placeholder={input.placeholder}
            onChange={(e) => input.onChange({ [input.id]: e.target.value })}
          />
        )}
      </form>,
    secondStep: 
      <>
        <AutocompleteMap  loaded={isLoaded} onComplete={setDrugStore} />
        <button onClick={() => onAction('firstStep')}>back</button>
        <button onClick={() => onAction('confirm')}>next</button>
      </>,
    confirm: <div>confirmation screen</div>
  }


  const [ modalContent, setModalContent] = useState(modalContentMap['firstStep'])
  const [ step, setStep ] = useState('firstStep')
  const renderModalContent = (contentType) => (modalContentMap[contentType] || '')

  const onAction = (step) => {
    setStep(step)
    setModalContent(renderModalContent(step))
  }

  
  return (
    <>
      {modalContent}
      {step === 'firstStep' && <Input type="text" value="" label="Apteka" placeholder="Wyszukaj aptekę" onFocus={() => onAction('secondStep')} />}
      <br></br>
      <br></br>
      <button type="button" onClick={() => console.log({...strainName, ...region, ...price, ...amount, ...drugStore, ...city})}>show data</button>
    </>

  )
}

export default NewPostForm
