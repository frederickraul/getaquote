'use client';
import React from 'react';
import './styles.css';
import { AiFillStar } from 'react-icons/ai';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import StyledRating from '@/app/components/StyledRating';
import { colors } from '@/app/const/theme';
import EditButton from '@/app/components/EditButton';
import { IoIosAddCircleOutline, IoMdAddCircle, IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';



interface ButtonProps {
  item: any;
  small?: boolean;
  isLoading:() => void;
  edit?:boolean;
  title?:string;
  action?:()=>void;
 
}

const AddButton: React.FC<ButtonProps> = ({
  item,
  small,
  isLoading,
  edit,
  title,
  action
}) => {
  const router = useRouter();
  let currentPath = usePathname();

  const params = useParams();
  if(params?.productId){
    currentPath = `/listings/${params.listingId}`;
  }

return(
  
  <div className='listItem-wrap cursor-pointer col-span-1 group min-w-[120px] flex flex-col items-center '
  onClick={action}
  >
    <div className='w-3/4 aspect-square flex mt-5 rounded-x'>
      <div className='
          w-full 
          h-full  
          flex 
          justify-center 
          items-center 
          rounded-xl 
          border-4 
          border-neutral-500 
          group-hover:scale-110 
        hover:fill-white
          duration-500
          transition'>
      <MdOutlineAdd size={110} className='duration-500 fill-neutral-600'/>
      </div>
   <div className='relative mt-5'>
   </div>
    </div>
      <h4 className={`
          mt-4 
          font-bold 
          relative
          text-neutral-500
          text-center
          ${small ? 'text-sm' : 'text-lg'}
         
      `}>
        {title}
        </h4>

    <div className={`
        flex 
        flex-row 
        ${small ? 'justify-between' : 'justify-start'}
        font-bold 
        mt-1 
        ${small ? 'text-xs' : 'text-sm'}    
        ${small ? 'sm:text-sm' : 'sm:text-lg'}      
        text-neutral-500
        `}>
        <div className='text-base'>
          {item.title &&'THC 75%'}
          </div>
        <div className={`${small ? 'ml-0 text-base' : 'ml-4 text-base'}`}>
        {item.title && 'CBD 25%'}
          </div>
    </div>
    <div className={`
        ${small ? 'text-xs' : 'text-sm'}    
        ${small ? 'sm:text-sm' : 'sm:text-lg'}  
        font-bold uppercase mt-1 
        text-blue-600`}>
      {item.category}
    </div>
  </div>
);
}

export default AddButton;
