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
import OperationStatus from './ListingTime';
import useOwner from '@/app/hooks/useOwner';

interface ListingCardProps{
  data: Listing;
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
const ListingCard: React.FC<ListingCardProps> = ({
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

  const {horary} = data;

  
  const router = useRouter();
  const { getByValue} = useCountries();
  const location = getByValue(data.locationValue);
  const title = data.title;

  const { hasOwner } = useOwner({
    listingId:data.id,
    currentUser
  });

  const [stars, setStars] = useState<number | null>(2);

  const handleDelete = useCallback(
    () => {
      if(disabled){
        return;
      }
      if(actionId){
        onAction?.(actionId);
      }
    },
    [onAction, actionId, disabled],
  );
  
  const handleSecondAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      if(actionId){
        onActionSecond?.(actionId);
      }
      //console.log(actionId);
    },
    [onActionSecond,actionId],
  );

  const handleEditAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if(disabled){
        return;
      }
      if(actionId){
      onEditAction?.(actionId);
      }
    },
    [onEditAction, actionId, disabled],
  );
  
  const price = useMemo(() => {
    if(reservation){
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);


  

  return (
      <div 
        className='col-span-1 cursor-pointer group'> 
        <div className='flex flex-col w-full'>
          <div 
              onClick={()=> router.push(`/listings/${data.id}`)}
              className='aspect-square w-full relative overflow-hidden rounded-xl'>
            <Image
              sizes='100'
              priority={false}
              fill
              alt='Listing'
              src={data.imageSrc ? data.imageSrc : "https://res.cloudinary.com/dggeqtbik/image/upload/v1691279075/ybhipmcoemyemhupmitq.jpg"}
              className='object-cover h-full w-full group-hover:scale-110 transition'
              />
                <div className={hasOwner ? 'hidden' : 'absolute top-3 right-3'}>
                <HeartButton
                  item={data}
                  type='listing'
                  currentUser={currentUser}
                />
            </div>
          </div>
          <div className='font-bold text-sm mt-2'>
            {title}
          </div>
          <div className='font-light text-sm'>
          {!data.visibleAddress && `${data.address}, `}{data.apartment && !data.visibleAddress && `${data.apartment}, `}{data.city}, {data.state} {data.zipcode && `${data.zipcode}, `}{data.locationValue}
          </div>
          <div className='font-light text-sm'>
          {data.formattedPhone}
          </div>
          <div>
            <OperationStatus
              horary={data}
            />
          </div>
          <div className='flex flex-row items-center'>
            <Rating
              readOnly
              size='small'
              name="simple-controlled"
              value={stars}
              precision={0.5}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
            <div className='ml-2 text-neutral-500 text-sm'>
              {stars} (34)
            </div>
            
          </div>
          <div className='font-semibold text-green-500 text-sm'>
            View Menu
          </div>
          <div className='font-bold text-neutral-500 text-sm'>
            {data.category}
          </div>
        </div>
          {onAction && actionLabel && (
            <>
            <DoubleButton
              disabled={disabled}
              label={actionLabel}
              labelSecond={actionLabelSecond}
              onClick={handleEditAction}
              onClickSecond={handleSecondAction}
            />
            </>
            
          )}
      </div>
  )
}

export default ListingCard