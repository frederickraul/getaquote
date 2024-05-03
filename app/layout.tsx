import { Nunito } from "next/font/google";
import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Quote Form',
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
      <body>
              {children}
      </body>
    </html>
  )
}