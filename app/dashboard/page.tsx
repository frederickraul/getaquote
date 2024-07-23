import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
 
export default async function Page() {
  
    redirect('/dashboard/new')
 
}