import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import Button from '../UI/button'
import { date, time } from '@/utils'

import styles from './confirm-proce.module.scss'

dayjs.extend(utc)

const ConfirmPrice = ({ post, openChangePriceModal, updatePost }) => {
  const dateNow = dayjs().format(date)
  const timeNow = dayjs().format(time)

  const buttons = [
    { text: 'Zmień', buttonType: 'error', action: openChangePriceModal },
    { text: 'Potwierdz', buttonType: 'success', action: updatePost },
  ]
  
  console.log(post)
  return (
    <>
      <div className={styles.content}>
        <div className={styles.strainName}>{post.strainName}</div>
        <div className={styles.address}>{post.address}</div>
        <div className={styles.lastActualization}>Ostatnia aktualizacja</div>
        <div className={styles.date}><span>Data:</span>{dateNow}</div>
        <div className={styles.time}><span>Godzina:</span>{timeNow}</div>
        <div className={styles.price}><span>Cena:</span>{post.price} zł / gram</div>      
      </div>

      <div className={styles.actions}>
        {buttons.map((button, index) => <Button
          key={`confirm-price-btn-${index}`}
          text={button.text}
          buttonType={button.buttonType}
          action={button.action}
        />)}
      </div>
    </>
  )
}

export default ConfirmPrice
