import { InputHTMLAttributes, forwardRef, useId } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, className = '', ...props },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer items-start gap-2.5 text-sm text-neutral-300"
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded border-white/20 bg-white/5 accent-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/30 ${className}`}
        {...props}
      />
      <span>{label}</span>
    </label>
  )
})
