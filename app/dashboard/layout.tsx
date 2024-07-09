import DashboardLayout from "../components/dashboard/layouts/dashboard";
import '@/app/dashboard.css';
import ToasterProvider from "../providers/ToasterProvider";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/auth/signin');
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