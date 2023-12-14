import Spinner from '@/components/layout/spinner'

import styles  from './page.module.scss'

const Loading = () => {
  return <div className={styles.spinner}><Spinner /></div>
}

export default Loading
