import { ReactNode } from 'react'

const TONES = {
  neutral: 'bg-slate/10 text-slate',
  teal: 'bg-status-green/10 text-status-green',
  red: 'bg-status-red/10 text-status-red',
  amber: 'bg-status-gold/10 text-status-gold',
} as const

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: keyof typeof TONES
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}
    >
      {children}
    </span>
  )
}
