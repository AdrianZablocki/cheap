import { useState, useContext } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import SpinnerContext from '@/context/spinner-context'
import SnackbarContext from '@/context/snackbar-context'
import useErrorHandler, { SEVERITY } from '@/hooks/use-error-handler'
import { dateWithTime, updatePost } from '@/utils'
import Button from '../UI/button'
import Input from '../UI/input'

import styles from './change-price.module.scss'

dayjs.extend(utc)
dayjs.extend(timezone)

const ChangePrice = ({post, showModal}) => {
  const { price } = post
  const [ newPrice, setNewPrice ] = useState(price)
  const [ amount, setAmount ] = useState(1)
  const { setOpenSpinner } = useContext(SpinnerContext)
  const { snackbarHandler } = useContext(SnackbarContext)
  const { handleError } = useErrorHandler(snackbarHandler)
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

  const onUpdatePost = async(price) => {
    setOpenSpinner(true)
    try {
      const data = await updatePost(post._id, {price, date: dayjs().utc().format(dateWithTime)})
      setOpenSpinner(false)
      snackbarHandler('Post został zaktualizowany', SEVERITY.SUCCESS)
      showModal(false)
    } catch (error) {
      console.log('UPDATE PRICE', error)
      setOpenSpinner(false)
      handleError(error)
    }
  }

  return (
    <div>
      <div>{dateNow}</div>
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

      {isPriceUpdated(newPrice, amount) && <div>zaktualizowana cena: {newPrice/amount} zł</div>}

      <div>
        <Button
          text="Aktualizuj"
          bgColor={'success'}
          disabled={!isPriceUpdated(newPrice, amount)}
          action={() => onUpdatePost(newPrice/amount)}
        />
        <br></br>
        <br></br>
        <Button
          text="Promocja nieaktualna"
          bgColor={'error'}
          action={() => onUpdatePost()}
        />
      </div>
    </div>
  )
}

export default ChangePrice
