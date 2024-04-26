import { Nunito } from "next/font/google";
import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Get A Quote - Ecology Cash For Cars',
  description: '',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={font.className} >
              {children}
      </body>
    </html>
  )
}