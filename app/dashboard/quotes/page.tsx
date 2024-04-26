import getQuotes, { IListingsParams } from '@/app/actions/getQuotes';
import UserPage from '@/app/components/dashboard2/pages/user'
import { UserView } from '@/app/components/dashboard2/sections/user/view';

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