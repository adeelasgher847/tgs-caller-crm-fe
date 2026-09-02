import { RequireRole } from '@/components/auth/RequireRole'

export default function FronterPage() {
  return (
    <RequireRole role="fronter">
      <div className="p-8">
        <h2 className="text-xl font-semibold">Fronter Workspace (mock)</h2>
        <p className="text-sm text-gray-600">Mock data displayed here for UI development.</p>
      </div>
    </RequireRole>
  )
}
