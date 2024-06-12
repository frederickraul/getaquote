import { Suspense } from "react"
import Footer from "../components/app/footer"
import Navbar from "../components/app/navbar"
import ToasterProvider from "../providers/ToasterProvider"
import Loading from "../Loading"
import '@/app/pages.css';
import getCurrentUser from "../actions/getCurrentUser copy"
import { redirect } from "next/navigation"



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect('/dashboard/new');
  }

  return (
    <div className="relative min-h-[100vh] bg-black">
    <div className="pb-0">
      <ToasterProvider/>    
    </div>
    <Suspense fallback={<Loading/>}>
    <div className="pb-20 pt-10 sm:pt-20 sm:pt-18 md:pt-28 lg:pt-32">
      {children}
    </div>
    </Suspense>
    <Footer/>
</div>

  )
}