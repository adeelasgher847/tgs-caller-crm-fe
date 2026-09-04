'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'

const WARRANTY_STATUS_OPTIONS = ['Active', 'Expired', 'Expiring soon', 'Unknown']

export function QualificationChecklist() {
  const [vehicle, setVehicle] = useState('')
  const [mileage, setMileage] = useState('')
  const [state, setState] = useState('')
  const [warrantyStatus, setWarrantyStatus] = useState('')
  const [consent, setConsent] = useState<'yes' | 'no'>('yes')
  const [notes, setNotes] = useState('')

  return (
    <div className="rounded-xl border border-slate/20 bg-white p-6">
      <h2 className="text-base font-semibold text-ink">Qualification Checklist</h2>

      <div className="mt-5 space-y-5">
        <Input
          label="Vehicle Year / Make / Model *"
          placeholder="e.g. 2019 Toyota Camry"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Mileage *"
            placeholder="e.g. 62,400"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
          <Input label="State *" placeholder="TX" value={state} onChange={(e) => setState(e.target.value)} />
        </div>

        <div>
          <label htmlFor="warranty-status" className="mb-1.5 block text-sm font-medium text-black">
            Warranty Status *
          </label>
          <select
            id="warranty-status"
            value={warrantyStatus}
            onChange={(e) => setWarrantyStatus(e.target.value)}
            className="block w-full rounded-lg border border-chrome bg-paper px-4 py-3 text-sm text-ink shadow-sm transition focus:border-status-blue focus:outline-none focus:ring-2 focus:ring-status-blue/30"
          >
            <option value="" disabled>
              Select
            </option>
            {WARRANTY_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-black">Consent / DNC confirmation *</p>
          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="consent"
                checked={consent === 'yes'}
                onChange={() => setConsent('yes')}
                className="h-4 w-4 accent-navy"
              />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="consent"
                checked={consent === 'no'}
                onChange={() => setConsent('no')}
                className="h-4 w-4 accent-navy"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="call-notes" className="mb-1.5 block text-sm font-medium text-black">
            Notes
          </label>
          <textarea
            id="call-notes"
            rows={3}
            placeholder="Add call notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full rounded-lg border border-chrome bg-paper px-4 py-3 text-sm text-ink placeholder-grey shadow-sm transition focus:border-status-blue focus:outline-none focus:ring-2 focus:ring-status-blue/30"
          />
        </div>
      </div>
    </div>
  )
}
