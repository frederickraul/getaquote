import '@/app/dashboard.css';



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
              <div>
                {children}
                </div>

  )
}