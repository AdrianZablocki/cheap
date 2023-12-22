import Image from 'next/image'

import styles from './icon-button.module.scss'

const IconButton = ({ 
  icon,
  width,
  height,
  action,
  priority,
  alt,
  text,
  padding,
  bgColor,
  color,
  borderRadius,
  disabled
}) => (
  <button
    className={styles.button}
    type="button" 
    onClick={action}
    disabled={disabled}
    style={{
      padding: padding,
      backgroundColor: bgColor,
      color: color,
      borderRadius: borderRadius
    }}
  >
    {text && <div className={styles.text}>{text}</div>}
    <Image
      width={width}
      height={height}
      priority={priority}
      src={icon}
      alt={alt}
    />
  </button>
)

export default IconButton
