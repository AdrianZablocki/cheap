import Link from 'next/link'

import gpsIcon from '@/public/icons/gps.svg'
import phoneIcon from '@/public/icons/phone.svg'
import clockIcon from '@/public/icons/clock.svg'
import IconButton from '../UI/icon-button'

import styles from './post-details.module.scss'

const PostDetails = ({ post }) => {
  console.log(post)
  const iconPadding = '0 4px 0 0'
  const daysMap = {
    0: 'Poniedziałek',
    1: 'Wtorek',
    2: 'Środa',
    3: 'Czwartek',
    4: 'Piątek',
    5: 'Sobota',
    6: 'Niedziela'
  }

  return (
    <div className={styles.post}>
      <h1>{post.strainName}</h1>
      <h2>{post.name}</h2>

      <div className={styles.details}>
        <Link href={post.mapUrl} target='blank'>
          <IconButton alt="gps icon" icon={gpsIcon} padding={iconPadding} />
        </Link>
        <span>{post.address}</span>
      </div>

      <div className={styles.details}>
        <Link href={`tel:${post.contact}`}>
          <IconButton alt="phone icon" icon={phoneIcon} padding={iconPadding} />
        </Link>
        <span>{post.contact}</span>
      </div>

      <div className={styles.details}>
        <IconButton alt="clock icon" icon={clockIcon} padding={iconPadding} />
        <div>
          {post.openingHours.map((item, index) => 
            <div key={`openingHours-${index}`}>
              {daysMap[index]} 
              <span> </span>
              {item.open.hours}:{item.open.minutes === 0 ? '00' : item.open.minutes}
              <span> - </span>
              {item.close.hours}:{item.close.minutes === 0 ? '00' : item.close.minutes}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default PostDetails
