import { useState } from 'react'

import Button from '../UI/button'
import Input from '../UI/input'

import styles from './change-price.module.scss'

const ChangePrice = ({ updatePost, disablePost, post }) => {
  const [ newPrice, setNewPrice ] = useState(post.price)
  const [ amount, setAmount ] = useState(1)
  const isPriceUpdated = (price, amount) => (price > 0 && amount > 0)

  const buttonsConfig = [
    {
      text: 'Aktualizuj',
      bgColor:'success',
      disabled: !isPriceUpdated(newPrice, amount),
      action: () => updatePost({price: (newPrice/amount).toFixed(2)})
    },
    {
      text: 'Promocja nieaktualna',
      bgColor:'error',
      disabled: false,
      action: disablePost
    }
  ]

  const onPriceChange = (e) => {
    e.preventDefault()
    setNewPrice(Number(e.target.value))
  }

  const onAmountChange = (e) => {
    e.preventDefault()
    setAmount(Number(e.target.value))
  }

  return (
    <div>
      <form className={styles.form}>
        <Input
          type="number"
          value={newPrice}
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

      {isPriceUpdated(newPrice, amount) && <div>zaktualizowana cena: {(newPrice/amount).toFixed(2)} zł</div>}

      <div>
        {buttonsConfig.map((button, index) => <Button
          key={`change-price-button-${index}`}
          text={button.text}
          bgColor={button.bgColor}
          disabled={button.disabled}
          action={button.action}
        />)}
      </div>
    </div>
  )
}

export default ChangePrice
