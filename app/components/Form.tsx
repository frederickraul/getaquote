import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Heading from './Heading';
import Input from './inputs/Input';
import Button from './Button';
import InputUnregistered from './inputs/InputUnregistered';


enum STEPS{
    DESCRIPTION = 1,
    CATEGORY = 2,
    ADDRESS = 3,
    LOCATION = 4,
    INFO =5,
    OPERATION =6,
    COVER =7,
    LOGO =8,
    FINISH = 9
  }

  
const Form = () => {
  
    const router = useRouter();

    const [step, setStep] = useState(STEPS.DESCRIPTION);
    const [isLoading, setIsLoading] = useState(false);

  
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState:{
        errors,
      },
      reset
    } = useForm<FieldValues>({
      defaultValues:{
        category: '',
        address: '',
        visibleAddress:false,
        apartment: '',
        zipcode: '',
        state: null,
        city: null,
        pin: null,
        phone:'',
        formattedPhone:'',
        XYZ: "xyz",
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc:'',
        coverSrc:'',
        price: 1,
        title: '',
        description: '',
        website:'',
      }
    });
  
    const category = watch('category');
    const location = watch('location');
    const state = watch('state');
    const city = watch('city');
    const pin = watch('pin');
    const visibleAddress = watch('visibleAddress');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const coverSrc = watch('coverSrc');
    const horary = watch('horary');
    const phone = watch('phone');
    const formattedPhone = watch('formattedPhone');
    const website = watch('website');
    const zipcode = watch('zipcode');
  
    
  //For Regular Inputs
  const setCustomValue = (id: string, value:any) => {    
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  //Week Hours
  const setWeekHours = (itemSelected: any) => {
    horary.map((item:any)=>{
        item.open = itemSelected.open;
        item.close = itemSelected.close;
        item.fulltime = itemSelected.fulltime;
        item.closed = itemSelected.closed;
        setValue('horary',[...horary]);
    })
  }

  //Weekend
  const setAllDaysHours = (itemSelected: any) => {
    horary.map((item:any)=>{
      item.open = itemSelected.open;
      item.close = itemSelected.close;
      item.fulltime = itemSelected.fulltime;
      item.closed = itemSelected.closed;
      setValue('horary',[...horary]);
    })
  }


  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    if(step !== STEPS.FINISH){
      return onNext();
    }
    
    setIsLoading(true);
    
    axios.post('/api/listings', data)
    .then(()=>{
      toast.success('Listing Created');
      router.refresh();
      reset();
      setStep(STEPS.DESCRIPTION);
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    }); 
  }
  
  const actionLabel = useMemo(() => {
    if(step === STEPS.FINISH){
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.DESCRIPTION){
      return undefined;
    }

    return 'Back';
  }, [step]);


// DESCRIPTION STEP
 let bodyContent = (
    <div className="flex flex-col gap-8">

      <InputUnregistered
      
        label="Please enter your VIN"
        disabled={isLoading}
        onChange={()=>{}}
       
        required
      />
      {/* <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
    </div>
  )


    
  return (
    <div>
    <div>
         {bodyContent}
          </div>
          <div 
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                    mt-5
                  "
                >
                  { secondaryActionLabel &&(
                    <Button 
                      full
                      outline
                      disabled={isLoading}
                      label={secondaryActionLabel}
                      onClick={onBack}
                    />
                  )}
                  
                     
                      <Button 
                      full
                      disabled={isLoading}
                      label={actionLabel}
                      onClick={()=>{}}
                      //onClick={handleSubmit}
                      />
                    
                </div>
    </div>
  )
}

export default Form