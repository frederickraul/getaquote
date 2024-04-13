'use client';


import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useCallback, useEffect, useState } from "react";

import EmptySpace from "../../components/EmptySpace";

import { useRouter } from "next/navigation";
import MessageDetails from "./MessageDetails";
import Avatar from "@/app/components/Avatar";
import Rating from "@/app/components/Rating";
import StyledRating from "@/app/components/StyledRating";
import ProductCard from "@/app/components/products/ProductCard";
import InputUnregistered from "@/app/components/inputs/InputUnregistered";
import Button from "@/app/components/Button";
import { MdArrowBackIos } from "react-icons/md";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface MessageClientProps {
  chat: any,
  product?: any,
  messages: any,
  recipient: any,
  currentUser?: any,
}

const MessageClient: React.FC<MessageClientProps> = ({
  chat,
  product,
  messages,
  recipient,
  currentUser,
}) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [currentNotifications, setcurrentNotifications] = useState([]);
  const [currentProduct, setcurrentProduct] = useState(product);
  const [seller, setSeller] = useState(chat.user);
  const [listing, setListing] = useState({ stateCode: "", city: '' });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const loginModal = useLoginModal();


  useEffect(() => {
    if (messages) {
      const orderedMessages = messages;
      orderedMessages.sort((a:any,b:any) => a.createdAt - b.createdAt);

      setcurrentNotifications(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (product) {
      setcurrentProduct(product);
      setSeller(recipient);
      setListing(product?.listing);
    }

  }, [product]);


  useEffect(() => {
    setIsLoading(false);
  }, [messages]);


  const handleMessageSave =  useCallback(() => {
    
    if (!currentUser) {
      return loginModal.onOpen();
    }
    if(message.length <= 5 ){
      setIsError(true);
      return;
    }

    setIsLoading(true);
    let recipientId = product?.userId;
    if(currentUser.id !== chat.userId){
        recipientId = chat.userId;
    }
   
    axios.post('/api/messages', {
      content: message,
      recipientId: recipientId,
      senderId: currentUser.id,
      chatId: chat.id,
    })
    .then((response) => {
      const savedData = response.data;
      //setIsQuestionModalOpen(false);
      axios.post(`/api/notifications`, {
        type:'message',
        recipientId: recipientId,
        senderId: currentUser.id,
        item: chat,
        message: message,
      })
      setMessage("");
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
      router.refresh();
    })
},
[
  message,
  currentUser,
]);


  return (
    <Container isLoading={isLoading}>
      <div className="flex flex-col md:flex-row text-base sm:text-2xl">
              <div className="flex flex-row cursor-pointer items-center text-sm" onClick={() => {
                setIsLoading(true);
                router.push('/messages');
              }}>
                <MdArrowBackIos /><span className="ml-1">Messages</span>

              </div>
            </div>
            <div className="mt-5 text-2xl font-bold">Product Questions</div>
     


        <div className="flex flex-row w-full mx-auto mb-20 bg-white rounded-lg mt-5">
          <div className="flex 
                          flex-col 
                          justify-between
                          w-full 
                          sm:w-2/3 
                          h-[60vh] 
                          border 
                          border-neutral-200 
                          py-3 px-2">
            <div className="flex border-b border-neutral-200 mx-3 pb-2">
              <div className="flex justify-center items-center">
                <Avatar src={seller?.image} size={45} />
              </div>
              <div className="flex flex-row ml-3 items-center">
                <span className="font-bold">{seller?.name}</span>
                <span className="text-sm ml-2">{listing?.city}, {listing?.stateCode}</span>
                
              </div>

            </div>
            <div className="relative overflow-y-auto">
              {currentNotifications?.map((notification: any) => (
                <MessageDetails
                  key={notification.id}
                  message={notification}
                  currentUser={currentUser}
                  onClick={() => { }} />


              ))}
            </div>
            <div className="
              border-t 
              border-neutral-200 
              mt-3 
              flex 
              justify-between 
              items-center">
                <textarea 
                  value={message}
                  className="
                    col-span-1
                    resize-none
                    border-none 
                    focus:outline-none 
                    focus:border-none 
                    mx-2 
                    pt-2
                    appearance-none
                    w-full
                    " 
                    placeholder="Message" onChange={(e) => { 
                      setMessage(e.target.value);
                      isError && setIsError(false);
                      console.log(message);
                      }}/>
                    
                <div className="h-[15px] w-[100px] flex items-center mr-5">
                  <Button label="Send" outline small onClick={() => { handleMessageSave()}} />
                </div>
            </div>
            <small  
              className={`
                ${isError ? 'flex': 'hidden'}
                font-bold 
                text-red-500`}>Message is too short</small>

          </div>
          <div className="hidden sm:flex sm:w-1/3">
            <ProductCard data={currentProduct} />
          </div>
        </div>
      
    </Container>
  );
}

export default MessageClient;