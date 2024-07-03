export const dynamic = 'auto'
import getBuyers from '@/app/actions/getBuyers';
import getQuotes from '@/app/actions/getQuotes';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';
import BuyersPage from '@/app/components/dashboard/sections/buyers/view/BuyersView';
import ReportPage from '@/app/components/dashboard/sections/report/view/ReportView';
import { HiOutlineDocumentReport } from 'react-icons/hi';

import { IoMailOpenOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';


const Page = async () => {
  const buyerList = await getBuyers();
  const quotes = await getQuotesByStatus('accepted');



  const header = (
    <div className='flex flex-row items-center justify-center'>
    <HiOutlineDocumentReport className='mr-2' color='#888888'/>
    Report
    </div>
  );
  return (
    <ReportPage headerStyles='bg-neutral-500' header={header} buyerList={buyerList} data={quotes}/>
    
    
  )
}


export default Page;