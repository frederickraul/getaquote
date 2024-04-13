'use client'
import React, { useRef, useState } from 'react'
import useRentModal from '../hooks/useRentModal';
import Button from './Button';
import InputUnregistered from './inputs/InputUnregistered';

const Form = () => {
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
  )
}

export default Form