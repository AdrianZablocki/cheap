import { useEffect, useRef, useState } from 'react'

import styles from './filters-chips.module.scss'

const FiltersChips = ({ filters, setFilters }) => {
  const itemsRef = useRef([]);
  const [ width, setWidth ] = useState(0)
  const chipPadding = 16
  const chipMargin = 20

  useEffect(() => {
     getContainerWidth()
 });

 const getContainerWidth = () => {
    itemsRef.current = itemsRef.current.slice(0, Object.keys(filters).length)
    const terfere = []
    itemsRef.current.forEach(item => {
      if (item?.offsetWidth) {
        terfere.push(item?.offsetWidth)
      }
    })
    setWidth(terfere.reduce((a, b) => a + b, 0) + (terfere.length * (chipMargin + chipPadding)))
 }
  return (
    <div className={styles.wrapper}>
      <div className={styles.chipsContainer} style={{width: width }}>
      {
        Object.keys(filters)?.map((key, index) => {
          if (filters[key]) {
            return <div
                className={styles.chip}
                key={`filter-${key}`}
                ref={el => itemsRef.current[index] = el}
              >
              <span>{filters[key]}</span>  <button type="button" onClick={() => setFilters({...filters, [key]: ''})}>X</button>
            </div>
          }
        })
      }
      </div>
    </div>
  )
}

export default FiltersChips
