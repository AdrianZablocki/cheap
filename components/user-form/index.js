'use-client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { EMAIL_REGEX, getFormikError, getRegionList } from '@/utils'
import Input from '../UI/input'
import Select from '../UI/select'
import Button from '../UI/button'

import styles from './user-form.module.scss'
import Link from 'next/link'
import { formConfig } from './user-form.handler'

const validation = Yup.object({
  name: Yup.string().required('Nazwa jest polem wymaganym'),
  email: Yup
    .string()
    .required('Email wymagany')
    .matches(EMAIL_REGEX, 'Adres e-mail musi być prawidłowy'),
  password: Yup.string().min(8, 'Hasło musi mieć przynajmniej 8 znaków').required('Hasło jest polem wymagane'),
  region: Yup.string().required('Region jest polem wymaganym'),
  consent: Yup
    .bool()
    .required('Zgoda jest wymagana')
    .oneOf([true], 'Zgoda jest wymagana'),
  ofAge: Yup
    .bool()
    .required('Oświadczenie o pełnoletności jest wymagane')
    .oneOf([true], 'Oświadczenie o pełnoletności jest wymagane'),
})

const UserForm = ({ handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      region: '',
      consent: '',
      ofAge: '',
      role: 'user',
      verified: false
    },
    validationSchema: validation,
    onSubmit: (values) => handleSubmit(values)
  })
  const { push } = useRouter()

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {
          formConfig.map(field => 
            <Input
              key={`registrtion-form-${field.id}`}
              id={field.id}
              name={field.id}
              value={formik.values[field.id]}
              label={field.label}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              error={getFormikError(formik, field.id)}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched(field.id)}
            />  
          )
        }
        <Select
          id="region"
          label="Region"
          value={formik.values.region}
          placeholder="Wybierz województwo"
          options={getRegionList()}
          error={getFormikError(formik, 'region')}
          onChange={formik.handleChange}
          onBlur={() => formik.setFieldTouched('region')}
        />

        <fieldset className={styles.statute}>
          <label forhtml="checkbox_id">
            <input
              id="ofAge"
              name="ofAge"
              type="checkbox"
              value={formik.values.ofAge}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched('ofAge')}
            />
            Mam ukończone 18 lat
          </label>
          <div className={styles.error}>{getFormikError(formik, 'ofAge')}</div>
        </fieldset>

        <fieldset className={styles.statute}>
          <label forhtml="checkbox_id">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              value={formik.values.consent}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched('consent')}
            />
            Akceputję <Link href="/terms" passHref>regulamin</Link> strony cheap weed
          </label>
          <div className={styles.error}>{getFormikError(formik, 'consent')}</div>
        </fieldset>

        <div className={styles.actionsWrapper}>
          <Button
            type="submit"
            text="Zarejstruj się"
            buttonType="successFilled" 
            disabled={!(formik.isValid && formik.dirty)}
          />
        </div>  
      </form>

      <div className={styles.actionsWrapper}>
        <div className={styles.activeUser}>Masz już konto?</div>
        <Button type="button" text="Zaloguj" buttonType="success" action={() => push('/login') }/>        
      </div>    
    </>
  )
}

export default UserForm
