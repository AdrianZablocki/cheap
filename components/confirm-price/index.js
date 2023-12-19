import Button from '../UI/button'

import styles from './confirm-proce.module.scss'

const ConfirmPrice = ({post, openCahngePriceModal, showModal, updatePost }) => {
  const buttons = [
    { text: 'Zmień', bgColor: 'error', action: openCahngePriceModal },
    { text: 'Potwierdz', bgColor: 'success', action: updatePost },
    { text: 'Wróć', bgColor: 'warning', action: showModal }
  ]
  
  return (
    <div>
      <div className={styles.price}>{post.price}zł/gram</div>
      <div className={styles.actions}>
        {buttons.map((button, index) => <Button
          key={`confirm-price-btn-${index}`}
          text={button.text}
          bgColor={button.bgColor}
          action={button.action}
        />)}
      </div>
    </div>
  )
}

export default ConfirmPrice
