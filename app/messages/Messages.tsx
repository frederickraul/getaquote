'use client';


import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useEffect, useState } from "react";

import EmptySpace from "../components/EmptySpace";
import { formatDate } from "../const/hours";
import Button from "../components/Button";
import { MdSend } from "react-icons/md";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Message from "../components/notification/Message";
import MessageDetails from "./MessageDetails";

interface MessagesProps {
  chats: any,
  currentUser?: any,
}

const Messages: React.FC<MessagesProps> = ({
  chats,
  currentUser,
}) => {

  useEffect(() => {
    if(chats){
      let orderedChats = chats;
      orderedChats.sort((a:any,b:any) => b.timestamp - a.timestamp);
      setcurrentNotifications(orderedChats);
    }    
  }, [chats]);

  // console.log(chats);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentNotifications, setcurrentNotifications] = useState([]);
  const router = useRouter();
    useEffect(() => {
      setIsLoading(false);
    }, [chats]);

 

  return (
    <Container isLoading={isLoading}>
      <Heading
        title="Messages"
        subtitle="List of all yours messages!"
      />
      {currentNotifications.length < 1 ?
        <EmptySpace title="There´s not messages yet." subtitle="" />
      :

      <div className="w-full mx-auto p-5 mb-20 bg-white rounded-lg shadow mt-5">
       {currentNotifications?.map((chat:any) => (
                chat.messages[0] && ( //Only display the chat if messages exist
                        <MessageDetails 
                          key={chat.id} 
                          chat={chat} 
                          currentUser={currentUser} 
                          onClick={()=>{}}/>

                      ))
                )
          }
        
      </div>
  }
    </Container>
   );
}
 
export default Messages;