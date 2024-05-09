export const dynamic = 'auto'
import getQuotes from '@/app/actions/getQuotes';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';

import { QuotesView } from '@/app/components/dashboard/sections/quotes/view';
import { MdOutlinePendingActions } from 'react-icons/md';


const Page = async () => {
  const quotes = await getQuotesByStatus("pending");


  const header = (
    <div className='flex flex-row items-center justify-center'>
    <MdOutlinePendingActions className='mr-2' color='#E4A11B'/>
    Pending Quotes
    </div>
  );

  return (
    <QuotesView headerStyles='bg-yellow-500' header={header} data={quotes}/>
    
    
  )
}


export default Page;