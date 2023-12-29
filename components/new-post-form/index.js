'use client'

import { useRouter } from 'next/navigation';
import { useContext, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useLoadScript } from '@react-google-maps/api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import UserContext from '@/context/user-context'
import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import { createPost, getFormikError, setDisabledScroll } from '@/utils'
import Input from '../UI/input'
import Select from '../UI/select'
import Button from '../UI/button'
import AutocompleteMap from '../autocomplete-map'
import { inputsConfig, selectsConfig } from './new-post-form.helper'

import styles from './new-post-form.module.scss'

dayjs.extend(utc)

const validation = Yup.object({
  amount: Yup.number().min(0).required('Waga suszu jest wymagana'),
  city: Yup.string().required('Miasto jest wymagane'),
  drugStore: Yup.object().required('Pole wymagane'),
  price: Yup.number().min(0.1).required('Cena suszu jest wymagana'),
  region: Yup.string().required('Pole wymagane'),
  strainName: Yup.string().required('Nazwa szuszu jest wymgana')
})

const NewPostForm = ({ setShowModal, posts, setPosts, step, setStep }) => {
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { userToken } = useContext(UserContext)
  const libraries = useMemo(() => ['places'], [])
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: libraries
  })

  const formik = useFormik({
    initialValues: {
      amount: undefined,
      city: '',
      drugStore: '',
      price: undefined,
      region: '',
      strainName: ''

    },
    validationSchema: validation,
    onSubmit: (values) => onCreateNewPost(values)
  })

  const onAction = (step) => setStep(step)

  const check = () => formik.values.strainName 
    && formik.values.city
    && formik.values.region 
    && formik.values.amount
    && formik.values.price

  const onCreateNewPost = async(values) => {
    setOpenSpinner(true)
    const { name, openingHours, address, contact, lat, lng } = values.drugStore
    const { strainName, region, city } = values
    const body = {
      name, openingHours, address, contact, lat, lng, strainName, region, city,
      author: userToken ? jwtDecode(userToken).name : '',
      date: dayjs().utc().format(),
      price: (values.price/values.amount).toFixed(2),
      isValid: true,
      confirmationCount: 0
    }
 
    try {
      const data = await createPost(body)
      console.log(data)
      setShowModal(false)
      setPosts([...posts, data.post])
      setDisabledScroll(false)
      setOpenSpinner(false)
      setStep('firstStep')
      snackbarHandler('Post został utworzony', SEVERITY.SUCCESS)
      router.replace('/')
    } catch (error) {
      setOpenSpinner(false)
      handleError(error)
    }
  }

  
  return (
    <form onSubmit={formik.handleSubmit}>
      {step === 'firstStep' && selectsConfig().map(select => 
        <Select
          key={`new-post-form-${select.id}`}
          id={select.id}
          value={formik.values[select.id]}
          label={select.label}
          placeholder={select.placeholder}
          options={select.options}
          error={getFormikError(formik, select.id)}
          onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched(select.id)}
        />)
      }
      {step === 'firstStep' && inputsConfig().map((input, index) => 
        <Input 
          key={`new-post-form-input-${input.id}-${index}`}
          type={input.type}
          id={input.id}
          name={input.id}
          value={formik.values[input.id]}
          label={input.label}
          min={input.min}
          placeholder={input.placeholder}
          error={getFormikError(formik, input.id)}
          onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched(input.id)}
        />)
      }
      {step === 'firstStep' && 
        <Input
          disabled={!check()}
          type="text"
          value={formik.values.drugStore?.name || ''}
          label="Apteka"
          placeholder="Wyszukaj aptekę"
          error={getFormikError(formik, 'drugStore')}
          onChange={formik.handleChange}
          onFocus={() => {
            setStep('secondStep')
            formik.setFieldTouched('drugStore')
          }}
        />
      }
      {step === 'submit' && 
        <div>
        </div>
      }
      {step === 'secondStep' && 
        <AutocompleteMap
          loaded={isLoaded}
          onComplete={formik.setFieldValue}
          field="drugStore"
          selectedAdress={formik.values.drugStore?.address || ''}
          setSelectedValue={formik.setFieldValue}
        />
      }
      <div className={styles.actionButtons}>
        {step === 'firstStep' && 
          <Button
            type="button"
            text="Dalej"
            buttonType="success"
            action={() => setStep('secondStep')}
            disabled={!check()}
          />
        }
        {step === 'secondStep' && 
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            type="button"
            text="Dalej"
            buttonType="success"
            action={() => setStep('submit')}
          />
        }
        {step === 'submit' && 
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            text="Utwórz wpis"
            buttonType="success"
          />
        }
      </div>
    </form>
  )
}

export default NewPostForm
