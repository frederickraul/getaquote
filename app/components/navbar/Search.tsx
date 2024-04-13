'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import { MdOutlineMyLocation } from 'react-icons/md';
import { IoIosPin } from 'react-icons/io';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');
  const  category = params?.get('category');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);


  const guestLabel = useMemo(() => {
    if (category) {
      return category;
    }

    return 'Category';
  }, [category]);

  return ( 
    <div
      onClick={searchModal.onOpen}
      className="
        ml-4
        border-[1px] border-black
        w-full 
        md:w-[350px] 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
            border-x-[1px] 
            w-[50%]
          "
        >
          {locationLabel}
        </div>
       
        <div 
          className="
            text-sm 
            pl-6 
            text-gray-600 
            flex 
            flex-row 
            items-center justify-between 
            gap-3 min-w-[165px]            
          "
        >
          <div className="sm:block">{guestLabel}</div>
          <div 
            className="
              p-2 
              bg-black 
              text-white
            "
          >
            <MdOutlineMyLocation size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;