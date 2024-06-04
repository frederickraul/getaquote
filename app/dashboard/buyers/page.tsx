export const dynamic = 'auto'
import getBuyers from '@/app/actions/getBuyers';
import BuyersPage from '@/app/components/dashboard/sections/buyers/view/BuyersView';

import { IoMailOpenOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';


const Page = async () => {
  const buyers = await getBuyers();



  const header = (
    <div className='flex flex-row items-center justify-center'>
    <IoMailOpenOutline className='mr-2' color='#888888'/>
    Buyers Email
    </div>
  );
  return (
    <BuyersPage headerStyles='bg-neutral-500' header={header} data={buyers}/>
    
    
  )
}


export default Page;