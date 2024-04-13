'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { 
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { BiCategoryAlt } from 'react-icons/bi';
import { FieldValues, useForm } from 'react-hook-form';

enum STEPS {
  LOCATION = 0,
  CATEGORY = 1,
  //INFO = 2,
}

const SearchModal = () => {
  const {
    register,
    formState:{
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues:{
  
    }
  });

  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [category, setCategory] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
    // eslint-disable-next-line
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.CATEGORY) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      category: category
    };

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location, 
    router, 
    onNext,
    params,
    category
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect 
      id='search'
      register={register}
      errors={errors}
        value={location} 
        onChange={(value) => 
          setLocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng} zoom={4} />
    </div>
  )

  // CATEGORY STEP
  if (step === STEPS.CATEGORY) {  
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes the listing?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid
          grid-cols-
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        ">
          {/* <CategoryInput
              onClick={()=>{
                setCategory('All')}}
              selected={category === 'All'}
              label={'All'}
              icon={BiCategoryAlt}

            /> */}
        {categories.map((item) =>(
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category)=>{
                setCategory(category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}

            />
          </div>
        ))}
      </div>

    </div>
  )}


  // if (step === STEPS.DATE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="When do you plan to go?"
  //         subtitle="Make sure everything is available!"
  //       />
  //       <Calendar
  //         onChange={(value) => setDateRange(value.selection)}
  //         value={dateRange}
  //       />
  //     </div>
  //   )
  // }

  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="More information"
  //         subtitle="Find your perfect product!"
  //       />
  //       <Counter 
  //         onChange={(value) => setGuestCount(value)}
  //         value={guestCount}
  //         title="Guests" 
  //         subtitle="How many guests are coming?"
  //       />
  //       <hr />
  //       <Counter 
  //         onChange={(value) => setRoomCount(value)}
  //         value={roomCount}
  //         title="Rooms" 
  //         subtitle="How many rooms do you need?"
  //       />        
  //       <hr />
  //       <Counter 
  //         onChange={(value) => {
  //           setBathroomCount(value)
  //         }}
  //         value={bathroomCount}
  //         title="Bathrooms"
  //         subtitle="How many bahtrooms do you need?"
  //       />
  //     </div>
  //   )
   

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;