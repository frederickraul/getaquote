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
 // console.log(format(DATE, 'yyyy/MM/dd kk:mm:ss'))

  return (
    <div className='flex flex-col text-center'>
      <div>{format(DATE, 'MM/dd/yyyy')}</div>
      <div>{format(DATE, 'h:mm b')}</div>

    </div>
  )
}

export default LastSeen;