'use client';

import useNotification from '@/app/hooks/useNotifications';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosClose, IoMdMailOpen } from 'react-icons/io';
import { MdEmail, MdOutlineMailOutline, MdOutlineMarkAsUnread, MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import Button from '../components/Button';
import { BiTime } from 'react-icons/bi';
import ConfirmModal from '../components/modals/ConfirmModal';
import useConfirmModal from '../hooks/useConfirmModal';

interface MessageProps {
  notification?: any;
  currentUser?: SafeUser;
  onClick:()=>void;
}

const MessageDetails: React.FC<MessageProps> = ({
  notification,
  currentUser,
  onClick
}) => {
  const notificationId = notification?.id;

  const route = useRouter();
  const noti = useNotification({notificationId, currentUser});
  const confirmModal = useConfirmModal();

  let notiLink = "#";
  let ItemLink = (<a className="font-bold text-blue-500" href={`/listings`}></a>);

  switch(notification.type){
    case "question":
      ItemLink=(<b>.</b>);
      notiLink="/customersQA";
      break;
    case "answer":
      notiLink = `/myQA`;
      ItemLink =(
        <a className="font-bold text-blue-500" href={`/myQA/`}>
          {notification.itemName}.
        </a>);
      break;
    case "favoriteListing":
      notiLink = `/listings/`+notification.itemId;
      ItemLink =(
        <a className="font-bold text-blue-500" href={`/listings/`+notification.itemId}>
          {notification.itemName}.
        </a>);
      break;
    case "favoriteProduct":
      notiLink = `/listings/`+notification?.item2Id+'/menu/'+notification.itemId;
      ItemLink =(
        <a className="font-bold text-blue-500" href={notiLink}>
          {notification.itemName}.
        </a>);
      break;
  }

  const confirmDeleteNotification = () =>{
    confirmModal.onOpen();
  }
  
  const handleDeleteNotification = () =>{
        noti.deleteNotification(notification.id);
  }
  
  return (
    <div 
        key={notification.id} 
       
        className="
          flex 
          justify-between
          items-center
          px-4 
          py-3 
          border-b 
          hover:bg-gray-100 
          -mx-2 
          cursor-pointer
          relative

          ">
         
        <div className='flex'>
          <div className='flex items-center justify-center mr-2 z-20'>
          
            <IoIosClose size={35} className={notification.status == 1 ? 'text-red-500' : 'text-neutral-300'} 
              onClick={(e)=>{
                if(notification.status == 0){
                  return;
                }
                e.preventDefault();
                
                confirmDeleteNotification();
                }} />
          
          <ConfirmModal 
             title='Are you sure you want to delete the notification?'
             body='This action can not be undone! '
            onSubmit={handleDeleteNotification}
          />
            {notification.status == 1 ?
            <MdOutlineMarkEmailRead className='text-green-600' size={25}/>
          :
          <MdOutlineMarkEmailUnread className='text-orange-400' size={25}/>}
          </div>
          <div className='flex justify-between w-auto' onClick={()=>{
            if(notification.status == 0){
              if(notification.type !=="question"){
                noti.setRead(notification.id);
              }
              route.push(notiLink)
            }
          }}>
            <div className='flex items-center'>
            <img 
            className="
              h-8 
              w-8 
              rounded-full 
              object-cover 
              mx-1" 
              src={notification?.sender?.image ? notification?.sender.image : "/images/placeholder.jpg"} 
              alt="avatar" />
          <p className="text-gray-600 text-sm mx-2">
            <a className="font-bold" href="#">{notification?.sender?.name} </a>  
              {notification?.content} 
              {ItemLink}
          
          </p>
          </div>
        
        </div>
        </div>
        <span className='text-neutral-700 ml-1 flex'>
          <ReactTimeAgo date={new Date(notification?.createdAt)} locale="en-US" timeStyle="twitter" />
        </span>
    </div>
  )
}

export default MessageDetails