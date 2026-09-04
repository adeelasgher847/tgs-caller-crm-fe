import { SelectHTMLAttributes, forwardRef, useId } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, id, className = '', children, ...props },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-neutral-300">
        {label}
      </label>
      <select
        ref={ref}
        id={inputId}
        className={`block w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white shadow-sm transition focus:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-400/30 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
})
