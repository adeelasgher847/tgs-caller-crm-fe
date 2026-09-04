import { ReactNode } from 'react'

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="mb-5 flex items-start gap-2 rounded-lg border border-status-red/30 bg-status-red/10 px-3 py-2.5 text-sm text-status-red"
    >
      <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.06 10.788c.75 1.334-.213 2.98-1.742 2.98H3.939c-1.53 0-2.493-1.646-1.743-2.98L8.257 3.1zM10 6a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 0110 6zm0 8.25a.938.938 0 100-1.875.938.938 0 000 1.875z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </div>
  )
}
