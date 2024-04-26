'use client'
import DashboardLayout from "../components/dashboard2/layouts/dashboard";
import '@/app/dashboard.css';
import ThemeProvider from "../components/dashboard2/theme";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <ThemeProvider>
      <DashboardLayout>
              <div>
                {children}
                </div>
      </DashboardLayout>
    </ThemeProvider>

  )
}