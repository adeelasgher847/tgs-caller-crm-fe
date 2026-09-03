import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
}

const VARIANT_CLASSES = {
  primary:
    'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25 hover:opacity-95',
  secondary:
    'border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10',
} as const

function Spinner() {
  return (
    <svg aria-hidden className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function Button({
  isLoading = false,
  loadingText,
  variant = 'primary',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Spinner />}
      {isLoading ? loadingText ?? children : children}
    </button>
  )
}
