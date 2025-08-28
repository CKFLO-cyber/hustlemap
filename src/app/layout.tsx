import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CASAai - Găsește locuința potrivită',
  description: 'Găsește locuința potrivită, direct de la proprietar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className={`${inter.className} bg-background text-body`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
