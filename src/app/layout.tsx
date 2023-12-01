import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Brain Agriculture'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={inter.variable} lang="en">
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  )
}
