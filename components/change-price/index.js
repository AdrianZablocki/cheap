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
      buttonType:'success',
      disabled: !isPriceUpdated(newPrice, amount),
      action: () => updatePost({price: (newPrice/amount).toFixed(2)})
    },
    {
      text: 'Promocja nieaktualna',
      buttonType:'error',
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
    <>
      <div className={styles.content}>
        <div className={styles.strainName}>{post.strainName}</div>
        <div className={styles.address}>{post.address}</div>
      </div>

      <form>
        <Input
          type="number"
          value={newPrice}
          label="Cena (zł)"
          min={0}
          onChange={(e) => onPriceChange(e)}
        />
        <Input
          type="number"
          value={1}
          label="Waga (gram)"
          min={0}
          onChange={(e) => onAmountChange(e)}
        />
      </form>

      { isPriceUpdated(newPrice, amount) && 
        <div className={styles.newPrice}>
          Zaktualizowana cena za gram: <span>{(newPrice/amount).toFixed(2)}zł</span>
        </div>
      }

      <div className={styles.actions}>
        {buttonsConfig.map((button, index) => <Button
          key={`change-price-button-${index}`}
          className={styles.button}
          text={button.text}
          buttonType={button.buttonType}
          disabled={button.disabled}
          action={button.action}
        />)}
      </div>
    </>
  )
}

export default ChangePrice
