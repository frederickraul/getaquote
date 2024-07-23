import DashboardLayout from "../components/dashboard/layouts/dashboard";
import '@/app/dashboard.css';
import ToasterProvider from "../providers/ToasterProvider";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import { signOut } from "next-auth/react";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);


  if (!currentUser) {
    redirect('/auth/signin');
  }


  return (
      <DashboardLayout currentUser={currentUser} session={session}>
        <ToasterProvider/>   
              <div>
                {children}
                </div>
      </DashboardLayout>

  )
}