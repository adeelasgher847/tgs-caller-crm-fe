import '../styles/globals.css'
import MockProvider from './providers/MockProvider'

export const metadata = {
  title: 'Auto Warranty CRM',
  description: 'Frontend scaffold for Auto Warranty CRM'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <MockProvider>{children}</MockProvider>
      </body>
    </html>
  )
}
