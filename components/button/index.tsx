import cn from 'clsx'

import styles from './button.module.scss'

function Button({
  onClick = console.log,
  className = '',
  children = null,
  type = null,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(styles.button, className)}
    >
      {children}
    </button>
  )
}

export default Button
