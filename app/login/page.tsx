'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  AuthError,
  getCurrentUser,
  landingRouteForRoles,
  login,
  readToken,
  storeToken,
} from '@/lib/auth'
import { waitForMocking } from '@/lib/mockReady'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Already signed in? Skip the form and land straight on the workspace.
  useEffect(() => {
    const token = readToken()
    if (!token) return

    waitForMocking()
      .then(() => getCurrentUser(token))
      .then((user) => router.replace(landingRouteForRoles(user.roles)))
      .catch(() => {
        // stale/invalid token — let the user sign in again
      })
  }, [router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const { access_token } = await login({ email, password })
      storeToken(access_token)

      const user = await getCurrentUser(access_token)
      router.push(landingRouteForRoles(user.roles))
    } catch (err) {
      setError(
        err instanceof AuthError
          ? err.message
          : 'Unable to reach the server. Please check your connection and try again.'
      )
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen bg-neutral-950">
      <section className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-neutral-900 lg:flex lg:flex-col lg:justify-end">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12), transparent 45%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-64 w-64 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="none" className="h-24 w-24 text-white/80" aria-hidden>
              <path
                d="M4 12.5V11a8 8 0 0116 0v1.5M4 12.5a2 2 0 00-2 2V17a2 2 0 002 2h1a1 1 0 001-1v-4a1 1 0 00-1-1H4zm16 0a2 2 0 012 2V17a2 2 0 01-2 2h-1a1 1 0 01-1-1v-4a1 1 0 011-1h1zm-3 6v.5A2.5 2.5 0 0114.5 21.5h-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="relative z-10 p-12">
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
            Every lead, every call, one connected desk.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-teal-100/80">
            Fronters qualify, closers convert, and admins keep score — all from the same live
            call center CRM.
          </p>
        </div>
      </section>

      <section className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-lg shadow-teal-500/30">
              TGS
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Enter your call center credentials to reach your desk
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && <Alert>{error}</Alert>}

            <div className="mb-4">
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-6">
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" isLoading={isSubmitting} loadingText="Signing in…">
              Sign in
            </Button>
          </form>

          
        </div>
      </section>
    </main>
  )
}
