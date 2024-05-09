export const dynamic = 'auto'
import getQuotes from '@/app/actions/getQuotes';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';
import { QuotesView } from '@/app/components/dashboard/sections/quotes/view';

import { IoShieldCheckmarkOutline } from 'react-icons/io5';


const Page = async () => {
  const quotes = await getQuotesByStatus("accepted");



  const header = (
    <div className='flex flex-row items-center justify-center'>
    <IoShieldCheckmarkOutline className='mr-2' color='#14A44D'/>
    Accepted Quotes
    </div>
  );
  return (
    <QuotesView headerStyles='bg-green-600' header={header} data={quotes}/>
    
    
  )
}


export default Page;