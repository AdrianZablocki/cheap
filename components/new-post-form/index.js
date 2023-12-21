import { useMemo,useState } from 'react'
import Input from '../UI/input'
import Select from '../UI/select'
import { inputsConfig, selectsConfig } from './new-post-form.helper'
import Button from '../UI/button'
import AutocompleteMap from '../autocomplete-map'


import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

const NewPostForm = () => {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  const modalContentMap = {
    firstStep: <form>
        {selectsConfig.map(select => 
          <Select
            key={`new-post-form-${select.id}`}
            id={select.id} label={select.label} placeholder={select.placeholder} options={select.options} 
          />
        )}
        {inputsConfig.map((input, index) => 
          <Input 
            key={`new-post-form-input-${input.id}-${index}`}
            type={input.type}
            value={input.value}
            label={input.label}
            min={input.min}
            placeholder={input.placeholder}
            onChange={input.onChange}
          />
        )}
      </form>,
    secondStep: <AutocompleteMap  loaded={isLoaded}/>,
    2: <div>confirmation screen</div>
  }


  const [ modalContent, setModalContent] = useState(modalContentMap['firstStep'])
  const [ step, setStep ] = useState('firstStep')
  const renderModalContent = (contentType) => (modalContentMap[contentType] || '')

  const onAction = (step) => {

    console.log(step)
    // setShowModal(true)
    setStep(step)
    setModalContent(renderModalContent(step))
  }

  

  return (
    <>
      {modalContent}
      {step === 'firstStep' && <Input type="text" value="" label="Apteka" placeholder="Wyszukaj aptekę" onFocus={() => onAction('secondStep')} />}
    </>

  )
}

export default NewPostForm
