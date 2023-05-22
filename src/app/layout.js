// 'use client'
import './globals.css'
// import { Inter } from 'next/font/google'
import Header from './components/header/Header'
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from './context/Context'
// import { useState } from 'react';
// const inter = Inter({ subsets: ['greek'] })

export const metadata = {
  title: 'My Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  // const [theme, setTheme] = useState('light')

  return (
    <html lang="en">
      <body>
        <Store>
          <Header />
          {children}
        </Store>
      </body>
    </html>
  )
}
