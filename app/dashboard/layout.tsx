import DashboardLayout from "../components/dashboard/layouts/dashboard";
import '@/app/dashboard.css';
import ToasterProvider from "../providers/ToasterProvider";
import getCurrentUser from "../actions/getCurrentUser";
import Login from "../components/dashboard/sections/auth/Login";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
   return(
     <div>
        <ToasterProvider/>
        <Login/>
    </div>
      )
  }

  return (
      <DashboardLayout currentUser={currentUser}>
        <ToasterProvider/>  
              <div>
                {children}
                </div>
      </DashboardLayout>

  )
}