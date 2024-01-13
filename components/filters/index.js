import { useFormik } from 'formik'

import { getRegionList, getStrainList, setDisabledScroll } from '@/utils'
import Select from '../UI/select'
import Button from '../UI/button'
import Input from '../UI/input'

import styles from './filters.module.scss'

const Filters = ({ setFilters, closeModal, filters }) => {

  const formik = useFormik({
    initialValues: {
      region: filters.region,
      strainName: filters.strainName,
      city: filters.city
    },
    onSubmit: (values) => {
      setFilters(values)
      closeModal()
      setDisabledScroll(false)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Select
        id="region"
        value={formik.values.region}
        label="Województwo"
        placeholder="Wybierz województwo"
        options={getRegionList()}
        onChange={formik.handleChange}
      />
      <Input
        type="text"
        id="city"
        value={formik.values.city}
        label="Miasto"
        placeholder="Wybierz miasto"
        onChange={formik.handleChange}
      />
      <Select
        id="strainName"
        value={formik.values.strainName}
        label="Nazwa suszu"
        placeholder="Wybierz susz"
        options={getStrainList()}
        onChange={formik.handleChange}
      />
      <div className={styles.actionButtons}>
        <Button type="submit" buttonType="success" text="Pokaż wyniki" />
      </div>
    </form>
  )
}

export default Filters
