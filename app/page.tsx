import Link from 'next/link'

const FEATURES = [
  {
    title: 'Fronters',
    description: 'Qualify inbound leads fast with guided scripts and live disposition tracking.',
  },
  {
    title: 'Closers',
    description: 'Get warm, qualified transfers with full context — no cold screen-pops.',
  },
  {
    title: 'Admins',
    description: 'Monitor the funnel in real time and keep every agent accountable.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold">
            TGS
          </div>
          <span className="text-sm font-semibold text-neutral-300">Caller CRM</span>
        </div>
        <Link
          href="/login"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Sign in
        </Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-12 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Every lead, every call, one connected desk.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
          The call center CRM that takes a lead from first ring to closed deal — built for
          fronters, closers, and the admins keeping score.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-teal-400 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:opacity-95"
          >
            Sign in to your workspace
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="text-sm font-semibold text-teal-300">{feature.title}</h2>
              <p className="mt-2 text-sm text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-neutral-600">
        Access is provisioned by your administrator — there is no self-service sign-up.
      </footer>
    </main>
  )
}
