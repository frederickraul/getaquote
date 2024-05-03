'use client';
import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

interface ComponentProps {
  date:Date;
}


const LastSeen: React.FC<ComponentProps> = ({
 date
}) => {
  const [currentDate, setcurrentDate] = useState(date);

  return (
    <div>
      <ReactTimeAgo date={currentDate} locale="en-US" timeStyle="twitter"/>
    </div>
  )
}

export default LastSeen;