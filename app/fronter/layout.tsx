import { Sidebar } from '@/components/fronter/Sidebar'

export default function FronterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      <div className="min-w-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
