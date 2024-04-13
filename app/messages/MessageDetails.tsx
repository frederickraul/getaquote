'use client';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosClose, IoMdMailOpen } from 'react-icons/io';
import { MdEmail, MdOutlineMailOutline, MdOutlineMarkAsUnread, MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread } from 'react-icons/md';
import ReactTimeAgo from 'react-time-ago';
import Button from '../components/Button';
import { BiTime } from 'react-icons/bi';
import useConfirmModal from '../hooks/useConfirmModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import useChat from '../hooks/useChat';

interface MessageProps {
  chat?: any;
  currentUser?: SafeUser;
  onClick:()=>void;
}

const MessageDetails: React.FC<MessageProps> = ({
  chat,
  currentUser,
  onClick
}) => {
  const chatId = chat?.id;
  
  const CHAT = useChat({chatId, currentUser});

  const route = useRouter();

  const confirmModal = useConfirmModal();
  
  let notiLink = `/messages/${chat.id}`;
  let ItemLink = (<a className="font-bold text-blue-500" href={`/messages/${chat.id}`}></a>);
  const timestamp = new Date(chat?.timestamp || 0);



  const confirmDeleteNotification = () =>{
    confirmModal.onOpen();
  }
  
  const handleDeleteNotification = () =>{
        CHAT.deleteChatMessages(chat?.id);
  }
  
  return (
    <div 
        key={chat.id} 
       
        className="
          flex 
          px-4 
          py-3 
          border-b 
          hover:bg-gray-100 
          -mx-2 
          cursor-pointer
          relative
          justify-between
          ">
         
        <div className='flex'>
          <div className='flex items-center justify-center mr-2 z-20'>
            <IoIosClose size={35} className='text-red-500' 
              onClick={(e)=>{
                e.preventDefault();
                confirmDeleteNotification();
                }} />
          
          <ConfirmModal 
             title='Are you sure you want to delete all the messages from this user?'
             body='This action can not be undone! '
            onSubmit={handleDeleteNotification}
          />

          </div>
          <div className='flex justify-between w-auto' onClick={()=>{
            
              route.push(notiLink)
            
          }}>
            <div className='flex items-center'>
              <img 
              className="
                h-12 
                w-12 
                rounded-full 
                object-cover 
                mx-1" 
                src={chat?.user?.image ? chat?.user.image : "/images/placeholder.jpg"} 
                alt="avatar" />
              <div className="text-gray-600 text-sm mx-2 flex flex-col">
                <a className="font-bold" href="#">{chat?.user?.name} </a>  
                {chat.messages[0]?.content} 
                <span className='text-neutral-700 ml-1 flex text-sm'>
                  <ReactTimeAgo date={new Date(timestamp)} locale="en-US" timeStyle="twitter" />
                </span>
             </div>
           
          </div>
        
        </div>
        </div>

        <div>
                <img 
                  className="
                    h-14
                    w-14
                    rounded-md 
                    mx-1" 
                    src={chat?.product?.coverSrc ? chat?.product?.coverSrc : "/images/placeholder.jpg"} 
                    alt="" />
             </div>
    </div>
  )
}

export default MessageDetails