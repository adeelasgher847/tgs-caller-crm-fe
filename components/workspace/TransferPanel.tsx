'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ClosersTable, MOCK_CLOSERS } from './ClosersTable'
import { OverrideReason } from './OverrideReason'
import { Pagination } from './Pagination'

const TOTAL_PAGES = 10

export function TransferPanel() {
  const [page, setPage] = useState(1)
  const [overrideReason, setOverrideReason] = useState('')

  return (
    <div className="rounded-xl border border-slate bg-white p-6" style={{ borderWidth: '0.5px' }}>
      <h2 className="text-lg font-medium leading-[120%] text-ink">Transfer</h2>

      <p className="mt-4 text-sm font-medium text-ink">Available Closers</p>
      <ClosersTable closers={MOCK_CLOSERS} />
      <Pagination
        page={page}
        totalPages={TOTAL_PAGES}
        rangeStart={1}
        rangeEnd={MOCK_CLOSERS.length}
        onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(TOTAL_PAGES, prev + 1))}
      />

      <div className="mt-5">
        <Button type="button" disabled className="cursor-not-allowed bg-slate/40">
          Transfer to Closer
        </Button>
        <p className="mt-2 text-center text-xs text-slate">
          Add an override reason if the checklist isn&apos;t complete.
        </p>
      </div>

      <OverrideReason reason={overrideReason} onReasonChange={setOverrideReason} />
    </div>
  )
}
