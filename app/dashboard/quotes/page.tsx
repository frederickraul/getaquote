import getQuotes, { IListingsParams } from '@/app/actions/getQuotes';
import UserPage from '@/app/components/dashboard/pages/user'
import { UserView } from '@/app/components/dashboard/sections/user/view';

interface HomeProps {
  searchParams: IListingsParams
};

const Page = async ({ searchParams }: HomeProps) => {
  const quotes = await getQuotes(searchParams);
  console.log(quotes);
  return (
    <UserView data={quotes}/>
    
  
  )
}


export default Page;