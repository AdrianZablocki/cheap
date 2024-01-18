import { cookies } from 'next/headers'

import LayoutWrapper from '@/components/layout/layout-wrapper'

import './globals.scss'

export const metadata = {
  title: 'Cheap Weed',
  description: 'Cheap Weed - tania medyczna marihuana w Polsce',
  keywords: ['Cheap Weed, medyczna marihuana, marihuana, medyczna marihuana w Polsce, marihuana w Polsce, weed, medycyna, canadis, CBD, THC'],
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://cheapweed.pl'),
  openGraph: {
    title: 'Cheap Weed',
    locale: 'pl_PL',
    type: 'website',
    description: 'Cheap Weed - tania medyczna marihuana w Polsce',
    url: 'https://cheapweed.pl',
    images: '/logo_big.jpeg'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
}

export default function RootLayout({ children }) {
  const token = cookies().get('token')
  return (
    <html lang="pl">
      <body id="modal-root">
        {/* <LayoutWrapper token={token}>{children}</LayoutWrapper> */}
        <div>Sorki, mamy problemy techniczne</div>
      </body>
    </html>
  )
}
