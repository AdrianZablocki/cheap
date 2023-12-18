import { Inter } from 'next/font/google'

import LayoutWrapper from '@/components/layout/layout-wrapper'
import Header from '@/components/layout/header'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })
// add to body for inter family font className={inter.className}
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }) {

  return (
    <html lang="pl">
      <body id="modal-root">
        <Header logoWidth={80} logoHeight={40} />
        <LayoutWrapper>
          {children}      
        </LayoutWrapper>
      </body>
    </html>
  )
}



