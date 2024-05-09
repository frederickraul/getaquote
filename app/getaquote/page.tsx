
import ClientOnly from '../components/app/ClientOnly'
import Container from '../components/LoadingContainer'

import QuoteForm from '../components/app/Form/QuoteForm';
import getAllMakes from '../actions/getAllMakes';
import { makeList } from '../const/make';


const Home = async() => {
  // const makes = await getAllMakes();
  const makes = makeList;
  
  return (
    
    <ClientOnly>
      <Container>
        <div className="
            w:full
            px-5
            lg:px-0
            sm:w-[700px] 
            lg:w-[800px] 
            mx-auto 
            lg:pt-0
            ">

          <div>
           <QuoteForm makes={makes}/>
          </div>

        </div>
      </Container>

    </ClientOnly>
  )
}




export default Home