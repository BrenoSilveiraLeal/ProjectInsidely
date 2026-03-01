import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Insidely - Before choosing a career, see it from the inside',
  description: 'Converse com profissionais e descubra como são os empregos de verdade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-gray-950 text-white antialiased">
        <SessionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
