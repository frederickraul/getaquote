import DashboardLayout from "../components/dashboard/layouts/dashboard";
import '@/app/dashboard.css';
import ThemeProvider from "../components/dashboard/theme";
import ToasterProvider from "../providers/ToasterProvider";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <DashboardLayout>
        <ToasterProvider/>  
              <div>
                {children}
                </div>
      </DashboardLayout>

  )
}