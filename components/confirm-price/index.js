import styles from './confirm-proce.module.scss'

const ConfirmPrice = ({post, action}) => {
  return (
    <div>confirm price no edition <button>potwierdz</button> <button onClick={action}>zmień chuju muju</button>
    <div>price: {post.price}</div></div>
  )
}

export default ConfirmPrice
