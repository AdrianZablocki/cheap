import dayjs from 'dayjs'
import { useState } from 'react'

import { dateWithTime } from '@/utils'
import Button from '../UI/button'
import Input from '../UI/input'

import styles from './change-price.module.scss'

const ChangePrice = ({post}) => {
  const { price } = post
  const [ newPrice, setNewPrice ] = useState(price)
  const [ amount, setAmount ] = useState()

  const joinWith = ' zł / '

  const dateNow = dayjs().format(dateWithTime)

  const onPriceChange = (e) => {
    console.log(e)
    e.preventDefault()
    setNewPrice(Number(e.target.value))
  }

  const onAmountChange = (e) => {
    e.preventDefault()
    setAmount(Number(e.target.value))
  }

  const isPriceUpdated = (price, amount) => (price > 0 && amount > 0)

  return (
    <div>
      <div>{dateNow}</div>
      <form className={styles.form}>
        <Input
          type="number"
          value={price}
          label="Cena"
          min={0}
          onChange={(e) => onPriceChange(e)}
        />zł
        <Input
          type="number"
          value={1}
          label="Waga"
          min={0}
          onChange={(e) => onAmountChange(e)}
        /> gram 
      </form>

      {isPriceUpdated(newPrice, amount) && <div>zaktualizowana cena: {newPrice/amount} zł</div>}
      
      <div>
        <Button text="Aktualizuj" bgColor={'success'} />
        <Button text="Promocja nieaktualna" bgColor={'error'} />
      </div>
    </div>
  )
}

export default ChangePrice
