// Waits for MSW's browser worker (registered by app/providers/MockProvider.tsx)
// to finish starting before the caller makes its first request. Only
// meaningful when there's no real backend configured — once
// NEXT_PUBLIC_API_URL points at one, there's no mock worker to wait for.
export async function waitForMocking(): Promise<void> {
  if (typeof window === 'undefined') return
  if (process.env.NEXT_PUBLIC_API_URL) return

  const ready = (window as unknown as { __MSW_READY__?: Promise<unknown> }).__MSW_READY__
  if (ready) await ready
}
