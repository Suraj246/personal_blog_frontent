"use client"
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['greek'] })

import Header from './components/header/Header'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Providers from './redux/provider'


export default function RootLayout({ children }) {

  return (
    <html lang="en" >
      <body className={inter.className} suppressHydrationWarning={true} >
        <Providers>
          <SkeletonTheme baseColor="#b8b5b5" highlightColor="#444">
            <Header />
            {children}
          </SkeletonTheme>
        </Providers>
      </body>
    </html>
  )
}


