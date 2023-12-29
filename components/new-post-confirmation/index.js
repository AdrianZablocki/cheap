import styles from './new-post-confirmation.module.scss'

const NewPostConfirmation = ({data}) => {
  const { address, name } =  data.drugStore
  const { amount, city, price, region, strainName } = data

  const details = [
    { label: 'Nazwa suszu:', value: strainName },
    { label: 'Cena opakowania:', value: price, postfix: 'zł' },
    { label: 'Waga opakowania:', value: amount, postfix: 'gram' },
    { label: 'Województwo:', value: region },
    { label: 'Miasto:', value: city },
    { label: 'Apteka:', value: name },
    { label: 'Adres apteki', value: address}
  ]
  return (
    <>
      {details.map((item, index) => 
        <div className={styles.wrapper} key={`post-details-${item.label}-${index}`}>
          <div className={styles.label}>{item.label}</div>
          <div className={styles.value}>{item.value} {item.postfix ? <span> {item.postfix}</span> : ''}</div>
        </div>
      )}    
    </>

  )
}

export default NewPostConfirmation
