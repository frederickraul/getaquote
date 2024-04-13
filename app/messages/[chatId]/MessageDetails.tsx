'use client';

import useNotification from '@/app/hooks/useNotifications';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { IoIosClose, IoMdMailOpen } from 'react-icons/io';
import { MdEmail, MdOutlineMailOutline, MdOutlineMarkAsUnread, MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import Button from '../../components/Button';
import { BiTime } from 'react-icons/bi';

interface MessageProps {
  message?: any;
  currentUser?: SafeUser;
  onClick:()=>void;
}

const MessageDetails: React.FC<MessageProps> = ({
  message,
  currentUser,
  onClick
}) => {
  const notificationId = message?.id

  const route = useRouter();
  const noti = useNotification({notificationId, currentUser});
  const messagesEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [])
    
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  let notiLink = "#";
  let ItemLink = (<a className="font-bold text-blue-500" href={`/listings`}></a>);

  switch(message.type){
    case "message":
      ItemLink=(<b>.</b>);
      notiLink="/customersQA";
      break;
   
  }

  
  return (
    <div 
        key={message.id} 
        className="
          flex 
          relative
          ">
         
        <div className={`
                  flex 
                  mx-2 
                  my-1 
                  w-full 
                  ${message.senderId == currentUser?.id ? 'flex-row-reverse' :'flex-row'}`}>
            <div className='flex flex-col'>
                <div className='text-xs text-neutral-300 flex '>
                  <ReactTimeAgo date={new Date(message?.createdAt)} locale="en-US" timeStyle="twitter" />
                </div>
                <div className={`
                    ${message.senderId == currentUser?.id ? 'bg-emerald-500' :'bg-neutral-300'} 
                    ${message.senderId == currentUser?.id ? 'text-white' :'text-black'} 
                     px-3 py-2 
                    rounded-sm`}>
                  {message.content}
                </div>
            </div>
         
        </div>
        <div ref={messagesEndRef}></div>
    </div>
  )
}

export default MessageDetails