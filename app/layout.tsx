import { Nunito } from "next/font/google";
import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google'
import Navbar from "./components/navbar";



import ToasterProvider from "./providers/ToasterProvider";

import Footer from "./components/footer";
import { Suspense, useEffect } from "react";
import Loading from "./Loading";


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
      <body className={font.className}>
        <div className="relative min-h-[100vh]">
            <div className="pb-0">
              <ToasterProvider/>    
              <Navbar/>
            </div>
            <Suspense fallback={<Loading/>}>
            <div className="pb-20 pt-28">
              {children}
            </div>
            </Suspense>
            <Footer/>
        </div>
      </body>
    </html>
  )
}
