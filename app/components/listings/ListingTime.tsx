'use client'

import { formatTime, isOpen } from '@/app/const/hours';
import { Horary } from '@prisma/client';
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai';

var d=new Date();
const currentDayNumber = d.getDay();

const dayOfWeekAsString = (dayIndex:number) => {
  return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
}

interface ListingHoraryProps {
  horary: any;
  fontBase?: boolean;
  iconSize? : number;
  showCurrentHorary?: boolean;
}

const OperationStatus:React.FC<ListingHoraryProps> = ({
  horary,
  fontBase,
  iconSize,
  showCurrentHorary
}) => {
  let STATUS="Soon";
  let STATUSCOLOR ="text-black";
  let HORARY="";
  const today = dayOfWeekAsString(currentDayNumber);
    horary.horary.filter((item:any)=>{
      if(today === item.day){
        HORARY = formatTime(item.open) + " - " + formatTime(item.close);
          if(item.fulltime){
            STATUS = "Open Now";
            STATUSCOLOR = `text-green-700`;
            return
          } 
          if(item.closed){
            STATUS = "Close Now";
            STATUSCOLOR = `text-red-500`;
            return
          }
          STATUSCOLOR = `text-neutral-500`;
          STATUS = isOpen(item.open, item.close) || 'Soon';
          
          if(STATUS === "Close Soon") STATUSCOLOR = `text-yellow-500`;
          if(STATUS === "Open Soon") STATUSCOLOR = `text-blue-500`;
          if(STATUS === "Open Now") STATUSCOLOR = `text-green-700`;
          if(STATUS === "Close Now") STATUSCOLOR = `text-red-500`;
      }
    })
  
  return (
    <div>
      <div className={`font-bold flex flex-col md:flex-row ${STATUSCOLOR}`}>
            <div className='flex flex-row'>
              <AiOutlineClockCircle size={iconSize ? iconSize : 12 }/> 
            <span className={`ml-1 ${fontBase ? '' : 'text-sm'}`}>{STATUS}</span>

            </div>
            <div className='text-black ml-2'>
              {showCurrentHorary && HORARY}
            </div>
      </div>
      
    </div>
    
  )
}

export default OperationStatus;