"use client"
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['greek'] })

import { Provider } from "react-redux"
import store from '@/app/redux/store'
import Header from './components/header/Header'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function RootLayout({ children }) {

  return (
    <html lang="en" >
      <body className={inter.className} suppressHydrationWarning={true} >
        <Provider store={store}>
          <SkeletonTheme baseColor="#b8b5b5" highlightColor="#444">
            <Header />
            {children}
          </SkeletonTheme>
        </Provider>
      </body>
    </html>
  )
}
