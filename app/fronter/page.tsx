'use client'

import { useEffect, useState } from 'react'
import { RequireRole } from '@/components/auth/RequireRole'
import { Alert } from '@/components/ui/Alert'
import { QueueRow } from '@/components/fronter/QueueRow'
import { StatTile } from '@/components/fronter/StatTile'
import { CurrentUser, getCurrentUser, readToken } from '@/lib/auth'
import { InteractionDetail, listInteractions } from '@/lib/interactions'
import { waitForMocking } from '@/lib/mockReady'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; user: CurrentUser; queue: InteractionDetail[] }

export default function FronterPage() {
  return (
    <RequireRole role="fronter">
      <Dashboard />
    </RequireRole>
  )
}

function Dashboard() {
  const [load, setLoad] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    const token = readToken()
    if (!token) return

    waitForMocking()
      .then(() => Promise.all([getCurrentUser(token), listInteractions(token)]))
      .then(([user, queue]) => {
        if (cancelled) return
        setLoad({ status: 'ready', user, queue })
      })
      .catch(() => {
        if (cancelled) return
        setLoad({ status: 'error', message: 'Unable to load your queue right now.' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (load.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <p className="text-sm text-neutral-400">Loading your desk…</p>
      </div>
    )
  }

  if (load.status === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <div className="w-full max-w-sm">
          <Alert>{load.message}</Alert>
        </div>
      </div>
    )
  }

  const { user, queue } = load
  const activeCount = queue.filter((i) => i.status === 'active').length
  const wrapUpCount = queue.filter((i) => i.status === 'wrap_up').length

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm text-neutral-400">Welcome back</p>
          <h1 className="mt-0.5 text-2xl font-semibold tracking-tight">{user.name}</h1>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatTile label="In queue" value={queue.length} />
          <StatTile label="Live calls" value={activeCount} />
          <StatTile label="Wrap-up" value={wrapUpCount} />
        </div>

        <h2 className="mb-3 text-sm font-semibold text-white">Your queue</h2>

        {queue.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-neutral-400">
            No calls waiting right now.
          </p>
        ) : (
          <div className="space-y-2">
            {queue.map((interaction) => (
              <QueueRow key={interaction.id} interaction={interaction} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
