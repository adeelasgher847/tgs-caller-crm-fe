export type Closer = {
  id: string
  name: string
  dateRange: string
  status: string
}

export const MOCK_CLOSERS: Closer[] = [
  { id: '1', name: 'Mubeen N.', dateRange: '08.08.2026', status: 'Completed' },
  { id: '2', name: 'Mubeen N.', dateRange: '08.08.2026', status: 'Completed' },
  { id: '3', name: 'Mubeen N.', dateRange: '08.08.2026', status: 'Completed' },
  { id: '4', name: 'Mubeen N.', dateRange: '08.08.2026', status: 'Completed' },
  { id: '5', name: 'Mubeen N.', dateRange: '08.08.2026', status: 'Completed' },
]

export function ClosersTable({ closers }: { closers: Closer[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate/20 text-left text-xs font-medium text-slate">
          <th className="pb-2 font-medium">Name</th>
          <th className="pb-2 font-medium">Date Range</th>
          <th className="pb-2 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {closers.map((closer) => (
          <tr key={closer.id} className="border-b border-slate/10 last:border-0">
            <td className="py-2.5 text-ink">{closer.name}</td>
            <td className="py-2.5 text-ink">{closer.dateRange}</td>
            <td className="py-2.5 font-medium text-status-green">{closer.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
