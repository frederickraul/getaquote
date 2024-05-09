export const dynamic = 'auto'
import getQuotes from '@/app/actions/getQuotes';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';
import { QuotesView } from '@/app/components/dashboard/sections/quotes/view';

import { TfiReload } from 'react-icons/tfi';


const Page = async () => {
  const quotes = await getQuotesByStatus("proccesing");


  const header = (
    <div className='flex flex-row items-center justify-center'>
    <TfiReload className='mr-2' color='#54B4D3'/>
    Proccesing Quotes
    </div>
  );
  return (
    <QuotesView fieldOrder headerStyles='bg-blue-400' header={header} data={quotes}/>   
  )
}


export default Page;