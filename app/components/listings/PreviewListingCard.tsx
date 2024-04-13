'use client'
import useCountries from '@/app/hooks/useCountries';
import {Listing, Reservation, User } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { Rating } from '@mui/material';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { SafeUser } from '@/app/types';
import DoubleButton from '../DoubleButton';
import ConfirmModal from '../modals/ConfirmModal';

interface ListingCardProps{
  data: any;
  reservation?: Reservation;
  onEditAction?:(id:string) => void;
  onAction?:(id:string) => void;
  onActionSecond?:() => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabelSecond?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const PreviewListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onEditAction,
  onAction,
  onActionSecond,
  disabled,
  actionLabel,
  actionLabelSecond,
  actionId= "",
  currentUser 
}) => {  
  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);
  const [stars, setStars] = useState<number | null>(2);

  const { 
      id, 
      imageSrc, 
      state, city, 
      country,
      apartment,
      address, zipcode, 
      visibleAddress, 
      formattedPhone, 
      category  } = data;

  const handleDelete = useCallback(
    () => {
      if(disabled){
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled],
  );
  
  const handleSecondAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      onActionSecond?.();
    },
    [onActionSecond],
  );

  const handleEditAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      onEditAction?.(actionId);
    },
    [onEditAction, actionId, disabled],
  );
  
 
  return (
      <div 
        className='col-span-1 cursor-pointer group min-w-min'> 
        <div className='flex flex-col w-full'>
          <div 
              className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <Image
              sizes='100'
              priority={false}
              fill
              alt='Listing'
              src={imageSrc ? imageSrc : "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg"}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              />
            <div className='absolute top-3 right-3'>
                <HeartButton
                  item={data}
                  currentUser={currentUser}
                  disable
                />
            </div>
          </div>
          <div className='font-bold text-sm mt-2'>
            {data.title}
          </div>
          <div className='font-light text-sm whitespace-break-spaces'>
           {!visibleAddress && `${address}, `}{apartment && !visibleAddress && `${apartment}, `}{city}, {state} {zipcode&&`${zipcode}, `}{country}
          </div>
          <div className='font-light text-sm whitespace-break-spaces'>
          {formattedPhone} 
          </div>
          <div className='font-bold text-green-700 flex flex-row items-center '>
            <AiOutlineClockCircle size={12}/> <span className='ml-1 text-sm'>Open Now</span>
          </div>
          <div className='flex flex-row items-center'>
            <Rating
              size='small'
              name="simple-controlled"
              precision={0.5}
              value={3.5}
              readOnly
              sx={{
                fontSize: {
                  sm: 14, // theme.breakpoints.up('sm')
                  md: 18, // theme.breakpoints.up('md')
                },
              }}
            />
            <div className='ml-2 text-neutral-500 text-xs lg:text-sm'>
              {3.5} (34)
            </div>
            
          </div>
          <div className='font-semibold text-green-500 text-sm'>
            View Menu
          </div>
          <div className='font-bold text-neutral-500 text-sm'>
            {category}
          </div>
        </div>
      </div>
  )
}

export default PreviewListingCard