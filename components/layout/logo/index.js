import Image from 'next/image'
import Link from 'next/link'

import logoIcon from '@/public/icons/logo.svg'

const Logo = ({width, height}) => (
  <Link href="/" passHref>
    <Image
      width={width}
      height={height}
      src={logoIcon}
      alt="logo"
      priority
    />
  </Link>

)

export default Logo
