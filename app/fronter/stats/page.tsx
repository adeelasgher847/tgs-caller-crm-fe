import { RequireRole } from '@/components/auth/RequireRole'

export default function FronterStatsPage() {
  return (
    <RequireRole role="fronter">
      <main className="min-h-screen bg-paper px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">My Stats</h1>
        <p className="mt-2 text-sm text-slate">Coming soon.</p>
      </main>
    </RequireRole>
  )
}
