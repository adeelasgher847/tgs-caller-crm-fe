'use client'

import { useEffect, useState } from 'react'
import { RequireRole } from '@/components/auth/RequireRole'
import { CallerLeadInfo } from './CallerLeadInfo'
import { DispositionCard } from './DispositionCard'
import { QualificationChecklist } from './QualificationChecklist'
import { TransferPanel } from './TransferPanel'

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function LiveCallBadge() {
  const [elapsed, setElapsed] = useState(42)

  useEffect(() => {
    const id = setInterval(() => setElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-status-red/10 px-2.5 py-1 text-xs font-medium text-status-red">
        <span className="h-1.5 w-1.5 rounded-full bg-status-red" />
        Live
      </span>
      <span className="text-sm text-slate">on call — {formatElapsed(elapsed)}</span>
    </div>
  )
}

export function ActiveCallScreen({ interactionId }: { interactionId: string }) {
  return (
    <RequireRole role="fronter">
      <main className="min-h-screen bg-slate/5 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">Active Call</h1>
            <LiveCallBadge />
          </div>
          <p className="mt-1 font-mono text-xs text-slate">{interactionId}</p>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <CallerLeadInfo />
              <QualificationChecklist />
            </div>
            <div>
              <DispositionCard />
              <TransferPanel />
            </div>
          </div>
        </div>
      </main>
    </RequireRole>
  )
}
