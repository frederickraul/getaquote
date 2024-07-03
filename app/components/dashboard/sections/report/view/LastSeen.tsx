'use client';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

interface ComponentProps {
  date:Date;
  time?:boolean;
}



const LastSeen: React.FC<ComponentProps> = ({
  date,
  time
}) => {
  const DATE = new Date(date);

  return (
    <div className='flex sm:flex-col text-center'>
      <div className='font-bold sm:font-normal'>{format(DATE, 'MM/dd/yyyy')}</div>
      {/* <div className='ml-2 sm:ml-0'>{format(DATE, 'h:mm b')}</div> */}

    </div>
  )
}

export default LastSeen;