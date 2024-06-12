export const dynamic = 'auto'
import getBuyers from '@/app/actions/getBuyers';
import getQuotes from '@/app/actions/getQuotes';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';

import { QuotesView } from '@/app/components/dashboard/sections/quotes/view';
import { MdOutlinePendingActions } from 'react-icons/md';


const Page = async () => {
  const quotes = await getQuotesByStatus("pending");
  const buyers = await getBuyers();

  const header = (
    <div className='flex flex-row items-center justify-center'>
    <MdOutlinePendingActions className='mr-2' color='#E4A11B'/>
    New Quotes
    </div>
  );

  if(!quotes){
    <QuotesView headerStyles='bg-yellow-500' header={header} data={[{name:'No quote found'}]}/>

  }
  return (
    <QuotesView headerStyles='bg-yellow-500' header={header} data={quotes} buyers={buyers}/>
    
    
  )
}


export default Page;