export const dynamic = 'auto'

import getQuotesByStatus from '@/app/actions/getQuotesByStatus';
import { QuotesView } from '@/app/components/dashboard/sections/quotes/view';
import { FaRegTimesCircle } from 'react-icons/fa';


const Page = async () => {
  const quotes = await getQuotesByStatus('declined')

  const header = (
    <div className='flex flex-row items-center justify-center'>
    <FaRegTimesCircle className='mr-2' color='#DC4C64'/>
    Declined Quotes
    </div>
  );
  return (
    <QuotesView headerStyles='bg-red-500'  header={header} data={quotes}/>   
  )
}


export default Page;