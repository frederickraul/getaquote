import { Suspense } from "react"
import Footer from "../components/app/footer"
import Navbar from "../components/app/navbar"
import ToasterProvider from "../providers/ToasterProvider"
import Loading from "../Loading"
import '@/app/pages.css';



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <div className="relative min-h-[100vh]">
    <div className="pb-0">
      <ToasterProvider/>    
      <Navbar/>
    </div>
    <Suspense fallback={<Loading/>}>
    <div className="pb-20 pt-20 sm:pt-18 md:pt-28 lg:pt-32">
      {children}
    </div>
    </Suspense>
    <Footer/>
</div>

  )
}