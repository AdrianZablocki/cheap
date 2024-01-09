import { getRegionList, getStrainList } from '@/utils'
import Select from '../UI/select'
import Button from '../UI/button'
import { useFormik } from 'formik'

const Filters = ({ setFilters, closeModal, filters }) => {

  const formik = useFormik({
    initialValues: {
      region: filters.region,
      strainName: filters.strainName,
    },
    onSubmit: (values) => {
      setFilters(values)
      closeModal()
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
      <Select
        id="strainName"
        value={formik.values.strainName}
        label="Nazwa suszu"
        placeholder="Wybierz susz"
        options={getStrainList()}
        onChange={formik.handleChange}
      />

      <Button type="submit" buttonType="success" text="Pokaż wyniki" />
    </form>
  )
}

export default Filters
