import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'small'
}

function Spinner({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <svg
      aria-hidden
      className={`h-4 w-4 animate-spin ${variant === 'primary' ? 'text-paper' : 'text-ink'}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

const VARIANT_CLASSES = {
  primary: 'bg-navy text-paper hover:opacity-90 disabled:opacity-50',
  secondary:
    'border border-slate/40 bg-paper text-ink hover:bg-slate/10 disabled:bg-slate/10 disabled:text-slate',
}

const SIZE_CLASSES = {
  default: 'px-4 py-3 text-sm',
  small: 'px-3.5 py-2 text-[13px]',
}

export function Button({
  isLoading = false,
  loadingText,
  variant = 'primary',
  size = 'default',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-lg font-semibold transition disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {isLoading && <Spinner variant={variant} />}
      {isLoading ? loadingText ?? children : children}
    </button>
  )
}
