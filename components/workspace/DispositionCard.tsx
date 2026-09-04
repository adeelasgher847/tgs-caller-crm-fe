'use client'

import { useState } from 'react'

const DISPOSITION_OPTIONS = [
  'Qualified — ready to transfer',
  'Not interested',
  'Callback requested',
  'Do not call',
  'Invalid / wrong number',
]

export function DispositionCard() {
  const [disposition, setDisposition] = useState('')

  return (
    <div className="rounded-xl border border-slate bg-white p-6" style={{ borderWidth: '0.5px' }}>
      <h2 className="border-b border-slate/20 pb-4 text-lg font-medium leading-[120%] text-ink">Disposition</h2>
      <div className="mt-4">
        <select
          aria-label="Select disposition"
          value={disposition}
          onChange={(e) => setDisposition(e.target.value)}
          className="block w-full rounded-lg border border-chrome bg-paper px-4 py-3 text-sm text-ink shadow-sm transition focus:border-status-blue focus:outline-none focus:ring-2 focus:ring-status-blue/30"
        >
          <option value="" disabled>
            Select disposition
          </option>
          {DISPOSITION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
