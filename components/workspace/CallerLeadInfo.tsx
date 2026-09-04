function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function CallerLeadInfo() {
  return (
    <div className="rounded-xl border border-slate/20 bg-white p-6">
      <h2 className="text-base font-semibold text-ink">Caller / Lead Info</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-status-green/30 bg-status-green/10 px-3 py-1 text-xs font-medium text-status-green">
          <CheckIcon />
          Phone Matched
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate/30 px-3 py-1 text-xs font-medium text-slate">
          Source: <span className="text-ink">VICIdial</span>
        </span>
      </div>
    </div>
  )
}
