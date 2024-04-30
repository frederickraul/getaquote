
import ClientOnly from '../components/ClientOnly'
import Container from '../components/Container'

import QuoteForm from '../components/Form/QuoteForm';
import getAllMakes from '../actions/getAllMakes';


const Home = async() => {
  const makes = await getAllMakes();
  
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
            lg:pt-10
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