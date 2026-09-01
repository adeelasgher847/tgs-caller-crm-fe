import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auto Warranty CRM — Frontend (Scaffold)</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/fronter" className="text-blue-600">Fronter Workspace</Link>
        </li>
        <li>
          <Link href="/closer" className="text-blue-600">Closer Workspace</Link>
        </li>
        <li>
          <Link href="/admin" className="text-blue-600">Admin Console</Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
        </li>
        <li>
          <Link href="/login" className="text-blue-600">Login</Link>
        </li>
      </ul>
    </main>
  )
}
