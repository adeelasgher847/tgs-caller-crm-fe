import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { LiveCallStatus } from '@/components/workspace/LiveCallStatus'
import { formatDate, formatPhone } from '@/lib/format'
import type { InteractionDetail } from '@/lib/interactions'

const SOURCE_LABEL: Record<InteractionDetail['lead']['source'], string> = {
  vicidial: 'VICIdial',
  ghl: 'GoHighLevel',
}

export function QueueRow({ interaction }: { interaction: InteractionDetail }) {
  return (
    <Link
      href={`/fronter/workspace/${interaction.id}`}
      className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition hover:border-teal-400/40 hover:bg-white/[0.06]"
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-teal-300">
          <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5" aria-hidden>
            <path
              d="M6.62 10.79a15.09 15.09 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {formatPhone(interaction.lead.phone_normalized)}
          </p>
          <p className="mt-0.5 truncate text-xs text-neutral-500">
            <Badge tone="neutral">{SOURCE_LABEL[interaction.lead.source]}</Badge>
            <span className="ml-2">Lead since {formatDate(interaction.lead.created_at)}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-4">
        <div className="w-28">
          <LiveCallStatus status={interaction.status} startedAt={interaction.started_at} />
        </div>
        <span className="hidden text-sm font-medium text-teal-300 sm:inline">Open →</span>
      </div>
    </Link>
  )
}
