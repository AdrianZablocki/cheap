import { useFormik } from 'formik'

import { getRegionList, getStrainList, setDisabledScroll } from '@/utils'
import Select from '../UI/select'
import Button from '../UI/button'
import Input from '../UI/input'

import styles from './filters.module.scss'

const Filters = ({ setFilters, closeModal, filters, sort, setSort }) => {

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

  const sortsCheckbox = [
    { id: 'priceAsc', name: 'priceAsc', value: { sortBy: 'price', sortDir: 1 }, label: 'Najniższa cena' },
    { id: 'priceDesc', name: 'priceDesc', value: { sortBy: 'price', sortDir: -1 },label: 'Najwyższa cena' },
    { id: 'dateDesc',  name: 'dateDesc',  value: { sortBy: 'date', sortDir: -1 }, label: 'Najnowsze wpisy'  },
  ]

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.sortBy}>
        <div className={styles.sortTitle}>Sortuj według</div>

        <div className={styles.sortItems}>
          {sortsCheckbox.map((item, index) => 
            <fieldset key={`sortby_${item.id}_${index}`} className={styles.statute}>
              <label forhtml={item.id}>
                <input
                  id={item.id}
                  name={item.name}
                  type="radio"
                  value={item.value}
                  checked={sort.sortBy === item.value.sortBy && sort.sortDir === item.value.sortDir}
                  onChange={() => setSort(item.value)}
                />
                {item.label}
              </label>
            </fieldset>
          )}
        </div>
      </div>
      <fieldset>
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
      </fieldset>
      
      <div className={styles.actionButtons}>
        <Button type="submit" buttonType="success" text="Pokaż wyniki" />
      </div>
    </form>
  )
}

export default Filters
