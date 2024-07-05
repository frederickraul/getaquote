export const dynamic = 'auto'
import getBuyers from '@/app/actions/getBuyers';
import getQuotesByStatus from '@/app/actions/getQuotesByStatus';
import getSettingsByName from '@/app/actions/getSettingsByName';
import ReportPage from '@/app/components/dashboard/sections/report/view/ReportView';
import { HiOutlineDocumentReport } from 'react-icons/hi';


const Page = async () => {
  const buyerList = await getBuyers();
  const quotes = await getQuotesByStatus('accepted');
  const business = await getSettingsByName('business');

  const header = (
    <div className='flex flex-row items-center justify-center'>
    <HiOutlineDocumentReport className='mr-2' color='#888888'/>
    Report
    </div>
  );
  return (
    <ReportPage headerStyles='bg-neutral-500' header={header} businessInfo={business?.values[0]} buyerList={buyerList} data={quotes}/>
  )
}


export default Page;