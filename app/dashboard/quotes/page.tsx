import getQuotes from '@/app/actions/getQuotes';
import { UserView } from '@/app/components/dashboard/sections/user/view';


const Page = async () => {
  const quotes = await getQuotes();
  return (
    <UserView data={quotes}/>
    
  
  )
}


export default Page;