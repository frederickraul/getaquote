import { Nunito } from "next/font/google";
import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google'
import Navbar from "./components/navbar";

import LoginModal from './components/modals/LoginModal';
import RegisterModal from "./components/modals/RegisterModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import Footer from "./components/footer";
import { Suspense, useEffect } from "react";
import Loading from "./Loading";
import ListingModal from "./components/modals/ListingModal";
import getNotificationsByRecipientId from "./actions/getNotificationsByRecipientId";

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
            <div className="pb-[30px] sm:pb-0">
              <ToasterProvider/>    
              <ListingModal/>     
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
