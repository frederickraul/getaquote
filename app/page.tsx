'use client';
import React, { useRef, useState } from 'react'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import Button from './components/Button'
import InputUnregistered from './components/inputs/InputUnregistered';
import { FaCar, FaClipboardList, FaRegMoneyBillAlt } from "react-icons/fa";
import Form from './components/Form';
import useRentModal from '@/app/hooks/useRentModal';


const page = () => {
  const rentModal = useRentModal();

  const Ref = useRef<null | HTMLDivElement>(null);
  const [VIN, setVIN] = useState('');
  const [isVinValid, setisVinValid] = useState(false);
  

  const goForm = () => {
    Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVinManage=()=>{
    rentModal.onOpen();
    console.log(VIN);
  }

  const setValue = (value:string)=>{
    setVIN(value);
    console.log(value);
    if(validateVin(value)){
      setisVinValid(true);
    }else{
      setisVinValid(false);
    }

  }

  function validateVin(vin:string) {
    return validate(vin);
  
  
    // source: https://en.wikipedia.org/wiki/Vehicle_identification_number#Example_Code
    // ---------------------------------------------------------------------------------
    function transliterate(c:string) {
      return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
    }
  
    function get_check_digit(vin:string) {
      var map = '0123456789X';
      var weights = '8765432X098765432';
      var sum = 0;
      for (var i = 0; i < 17; ++i)
        sum += transliterate(vin[i]) * map.indexOf(weights[i]);
      return map[sum % 11];
    }
  
    function validate(vin:string) {
        if (vin.length !== 17) return false;
        return get_check_digit(vin) === vin[8];
      }
      // ---------------------------------------------------------------------------------
  }

  return (
    <ClientOnly>
      <Container>
        <div ref={Ref} className="
            w-[700px] 
            lg:w-[800px] 
            mx-auto 
            min-h-[200px
            pt-12
            pb-20
            ">
          <div className='my-10'>
            <div className='text-5xl font-bold mt-10 sm:mt-20 md:mt-10'>Get A Quote</div>
          </div>

          <div>
            <div className="font-bold text-lg">To receive an offer for your car, please fill out the form below. Make sure to include the correct
              <span className="text-red-500"> Vehicle ID Number (VIN)</span>.
            </div>
            <div className='pt-2'>
              <InputUnregistered
                label="Please enter your VIN"
                //disabled={isLoading}
                onChange={(e) => {setValue(e.target.value) }}
                required
              />
              {isVinValid ?
              <span className='text-sm text-green-500'>Valid VIN</span>
              :
              <span className='text-sm text-red-500'>Invalid VIN</span>
               }
            </div>
            <div className='py-4'>
              <Button
                full
                // disabled={isLoading}
                label='Next'
                onClick={handleVinManage}
              //onClick={handleSubmit}
              />
            </div>
          </div>

        </div>
      </Container>

      <Container full>
        <div className='
                    pt-8 
                    pb-16 
                    px-5 
                    bg-white 
                    '>
          <div className='
                    w-full 
                    lg:w-[1100px]
                    mx-auto'>
            <div className='
                      text-3xl 
                      text-center 
                      font-bold 
                      pt-4 
                      pb-8'>
              Get Quick Cash For Cars Today</div>
            <div className='text-justify text-lg'>
              Ecology Cash For Cars has transformed the car-selling process. It used to be that a for-sale sign or a car listing on a paid directory site was all it took to have your vehicle recognized by potential buyers. With Ecology Cash for Cars, all you have to do is answer a few basic questions about your vehicle, and in just a few minutes an offer will be made. We have auto buyers ready to buy your car, no matter its condition.
            </div>
          </div>
        </div>
      </Container>

      <Container full>
        <div className='
                    pt-8 
                    pb-5
                    px-5 
                    bg-black
                    text-white 
                    '>
          <div className='
                    w-full 
                    lg:w-[1100px]
                    mx-auto'>
            <div className='
                      mt-20
                      text-4xl 
                      lg:text-5xl
                      text-center 
                      font-bold 
                      pt-4 
                      pb-10'>
              Sell Your Junk Car In 3 Steps!</div>
            <div className='text-justify text-lg pb-10'>
              <div className='flex mb-10'>
                <div className='flex font-bold text-lg mr-20'>
                  <FaClipboardList className='text-primary-green' size={40} />
                  <span className='ml-10 text-xl font-bold'>Step 1</span>
                </div>
                <div>
                  Enter your vehicle details to get an instant quote.
                </div>
              </div>
              <div className='flex mb-10'>
                <div className='flex font-bold text-lg mr-20'>
                  <FaCar className='text-primary-green' size={40} />
                  <span className='ml-10 text-xl font-bold'>Step 2</span>
                </div>
                <div>
                  After we confirm your details, we’ll arrange for a pickup.
                </div>
              </div>
              <div className='flex mb-5'>
                <div className='flex mr-20'>
                  <FaRegMoneyBillAlt className='text-primary-green' size={40} />
                  <span className='ml-10 text-xl font-bold'>Step 3</span>
                </div>
                <div>
                  On-site payment will be made after we inspect and collect the vehicle.
                </div>
              </div>
            </div>
            <div className='flex justify-center mb-20'>
              <Button
                big
                color='bg-primary-green'
                label='Get A Quote' onClick={goForm} />
            </div>
            <div className='
                        text-3xl 
                        lg:text-5xl
                        text-center 
                        pt-20 
                        font-bold
                        mb-5
                        '>
              HAVE A QUESTION? CALL (800) 440-1510
            </div>
          </div>
        </div>
      </Container>

      <Container full>
        <div className='
                    pt-8 
                    pb-16 
                    px-5 
                    bg-primary-green
                    text-white 
                    '>
          <div className='
                    w-[600px] 
                    lg:w-[1100px]
                    mx-auto'>
            <div className='
                      text-3xl 
                      lg:text-5xl
                      text-center 
                      font-bold 
                      pt-4 '>
              <div>
                WE BUY CARS!
              </div>
              <div>
                BEST TRUCK & CAR BUYERS
              </div>
            </div>
          </div>
        </div>

      </Container>
    </ClientOnly>
  )
}

export default page