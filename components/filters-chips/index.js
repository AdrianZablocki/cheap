import { useEffect, useRef, useState } from 'react'

import closeIcon from '@/public/icons/close.svg'
import IconButton from '../UI/icon-button';

import styles from './filters-chips.module.scss'

const FiltersChips = ({ filters, setFilters }) => {
  const itemsRef = useRef([]);
  const [ width, setWidth ] = useState(0)
  const chipPadding = 40
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
      <div style={{width: width }}>
      {
        Object.keys(filters)?.map((key, index) => {
          if (filters[key]) {
            return <div
                className={styles.chip}
                key={`filter-${key}`}
                ref={el => itemsRef.current[index] = el}
              >
                <div className={styles.chipContent}>
                  <span className={styles.chipValue}>{filters[key]}</span>
                  <IconButton
                    width={14}
                    height={14}
                    icon={closeIcon}
                    alt="close icon"
                    action={() => setFilters({...filters, [key]: ''})}
                  /> 
                </div>
            </div>
          }
        })
      }
      </div>
    </div>
  )
}

export default FiltersChips
