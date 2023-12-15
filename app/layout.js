import { Inter } from 'next/font/google'

import LayoutWrapper from '@/components/layout/layout-wrapper'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }) {

  return (
    <html lang="pl">
      <body className={inter.className}>
        <LayoutWrapper>
          {children}      
        </LayoutWrapper>
      </body>
    </html>
  )
}
