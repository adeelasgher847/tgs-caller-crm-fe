"use client"
import { useEffect } from 'react'

export default function MockProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__MSW_STARTED__ !== true) {
      // mark as starting immediately to avoid race where multiple imports
      // trigger `worker.start()` nearly simultaneously which causes MSW to
      // warn about redundant starts.
      (window as any).__MSW_STARTED__ = true
      import('../../mocks/browser')
        .then(({ worker }) => worker.start())
        .catch(() => {
          // if starting the worker failed, allow retrying later
          (window as any).__MSW_STARTED__ = false
        })
    }
  }, [])

  return <>{children}</>
}
