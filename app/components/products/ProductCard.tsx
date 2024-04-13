'use client'
import useCountries from '@/app/hooks/useCountries';
import { Listing, Reservation, User, Horary } from '@prisma/client';
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
import { formatTime, isOpen } from '@/app/const/hours';
import useOwner from '@/app/hooks/useOwner';
import { TbArrowElbowLeft } from 'react-icons/tb';
import { MdArrowBack, MdArrowBackIos, MdArrowLeft } from 'react-icons/md';

interface ProductCardProps{
  data: any;
  reservation?: Reservation;
  onEditAction?:(id:string) => void;
  onAction?:(id:string) => void;
  onActionSecond?:(id:string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionLabelSecond?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}
const ProductCard: React.FC<ProductCardProps> = ({
  data,
  reservation,
  onEditAction,
  onAction,
  onActionSecond,
  disabled,
  actionLabel,
  actionLabelSecond,
  actionId,
  currentUser 
}) => {

  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);
  const {title, price, category,listingId} = data;

  

  return (
        <div className='flex flex-col w-full border p-2'>
          <div 
              onClick={()=> router.push(`/listings/${data.id}`)}
              className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <Image
              sizes='100'
              priority={false}
              fill
              alt='Listing'
              src={data.coverSrc ? data.coverSrc : "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg"}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              />

          </div>
          <div className='mx-2 mt-4 pt-1 flex flex-col border-t-[1px] border-neutral-200'>
            <span className='text-blue-500 mt-2'>
                {category}
            </span>
            <span className='text-3xl capitalize mt-2 font-bold'>
                {title}
            </span>

            <div className="flex items-center mt-2">
                <MdArrowBackIos/> <a className='text-blue-700 cursor-pointer' onClick={()=>router.push(`/listings/${listingId}`)}>Back to Listing Details</a>
              </div>
          </div>
          
        </div>
          )
}

export default ProductCard