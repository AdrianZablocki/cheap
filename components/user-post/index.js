import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { date } from '@/utils'

import styles from './user-post.module.scss'
import Button from '../UI/button'

dayjs.extend(utc)

const UserPost = ({post}) => {
 return (
  <li className={styles.post}>
    <h2>{post.strainName}<span>{dayjs(post.date).format(date)}</span></h2>
    <h3>{post.price} zł/gram</h3>
    <p>{post.name}</p>
    <p>{post.address}</p>
    <div className={styles.actions}>
      <Button buttonType="successNoBord" type="button" text="Edutuj" />
      <Button buttonType="errorNoBoard" type="button" text="Usuń" />
    </div>
  </li>
 ) 
}

export default UserPost
