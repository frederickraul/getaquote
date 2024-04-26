
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
            sm:px-0
            sm:w-[700px] 
            lg:w-[800px] 
            mx-auto 
            sm:pt-10
            ">
          <div className='my-10'>
            <div className='text-4xl sm:text-5xl font-bold mt-10 sm:mt-20 md:mt-10'>Get A Quote</div>
          </div>

          <div>
            <div className="font-bold sm:text-lg">To receive an offer for your car, please fill out the form below. Make sure to include the correct
              <span className="text-red-500"> Vehicle ID Number (VIN)</span>.
            </div>
           <QuoteForm makes={makes}/>
          </div>

        </div>
      </Container>

    </ClientOnly>
  )
}




export default Home