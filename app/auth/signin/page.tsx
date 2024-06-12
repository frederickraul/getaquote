export const dynamic = 'auto'

import SignIn from '@/app/components/dashboard/sections/auth/SignIn';
import { FaRegTimesCircle } from 'react-icons/fa';


const Page = async () => {

  const header = (
    <div className='flex flex-row items-center justify-center'>
    <FaRegTimesCircle className='mr-2' color='#DC4C64'/>
    Declined Quotes
    </div>
  );
  return (
    <div>
        <SignIn/>
      </div>   
  )
}


export default Page;