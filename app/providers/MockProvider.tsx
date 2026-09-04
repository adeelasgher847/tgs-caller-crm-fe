"use client"
import { useEffect } from 'react'

export default function MockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__MSW_STARTED__ !== true) {
      // mark as starting immediately to avoid race where multiple imports
      // trigger `worker.start()` nearly simultaneously which causes MSW to
      // warn about redundant starts.
      (window as any).__MSW_STARTED__ = true
      // Exposed so callers can await mock readiness before their first fetch —
      // see lib/mockReady.ts. Without this, a request fired on mount (e.g. an
      // auth check right after a page reload) can race the worker's async
      // registration and hit the real network instead of being intercepted.
      ;(window as any).__MSW_READY__ = import('../../mocks/browser')
        .then(({ worker }) => worker.start())
        .catch(() => {
          // if starting the worker failed, allow retrying later
          (window as any).__MSW_STARTED__ = false
        })
    }
  }, [])

  return <>{children}</>
}
