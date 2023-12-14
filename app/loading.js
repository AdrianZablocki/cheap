import Spinner from '@/components/layout/spinner'

import styles  from './page.module.css'

const Loading = () => {
  return(<div className={styles.spinner}><Spinner /></div>)
}

export default Loading
