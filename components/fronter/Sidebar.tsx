'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CurrentUser, clearToken, getCurrentUser, readToken } from '@/lib/auth'
import { waitForMocking } from '@/lib/mockReady'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden>
      <path
        d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z"
        fill="currentColor"
      />
    </svg>
  )
}

function QueueIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden>
      <path
        d="M4 6h2m0 0h12M6 6a1 1 0 100 2 1 1 0 000-2zM4 12h2m0 0h12M6 12a1 1 0 100 2 1 1 0 000-2zM4 18h2m0 0h12M6 18a1 1 0 100 2 1 1 0 000-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden>
      <path
        d="M4 19V9m6 10V5m6 14v-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden>
      <path
        d="M6 9a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9zM9.5 17a2.5 2.5 0 005 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0" aria-hidden>
      <path
        d="M15 17l5-5-5-5M20 12H9m0 8H5a1 1 0 01-1-1V5a1 1 0 011-1h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/fronter/workspace/int-1001', label: 'Active Call', icon: PhoneIcon },
  { href: '/fronter', label: 'Queue', icon: QueueIcon },
  { href: '/fronter/stats', label: 'My Stats', icon: StatsIcon },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    let cancelled = false
    const token = readToken()
    if (!token) return
    waitForMocking()
      .then(() => getCurrentUser(token))
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  function handleSignOut() {
    clearToken()
    router.push('/login')
  }

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-slate/20 bg-white">
      <div className="flex items-center gap-3 border-b border-slate/20 px-5 py-5">
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate/15" aria-hidden />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{user?.name ?? '[NAME]'}</p>
          <p className="truncate text-xs text-slate">CRM — Fronter</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === '/fronter' ? pathname === '/fronter' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? 'bg-navy/10 text-navy' : 'text-slate hover:bg-slate/10 hover:text-ink'
              }`}
            >
              <Icon />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate/20 px-3 py-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate">
          <span className="relative">
            <BellIcon />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-status-red text-[9px] font-semibold text-white">
              2
            </span>
          </span>
          Notification
        </div>

        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-slate/20" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{user?.name ?? 'Jane Doe'}</p>
            <p className="truncate text-xs text-slate">{user?.email ?? 'jane.doe@gmail.com'}</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            aria-label="Sign out"
            className="flex-shrink-0 text-slate hover:text-ink"
          >
            <SignOutIcon />
          </button>
        </div>
      </div>
    </aside>
  )
}
