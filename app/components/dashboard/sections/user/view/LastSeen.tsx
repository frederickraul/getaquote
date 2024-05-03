'use client';
import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

interface ComponentProps {
  date:Date;
}



const LastSeen: React.FC<ComponentProps> = ({
  date
}) => {
  const DATE = new Date(date);

  const [currentDate, setcurrentDate] = useState(date);

  return (
    <div>
      {date.getDay()} {}
    </div>
  )
}

export default LastSeen;