'use client';

import { SafeListing, SafeProduct, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { useCallback, useEffect, useState } from "react";
import ListItem from "../listings/[listingId]/List/ListItem";
import InputUnregistered from "../components/inputs/InputUnregistered";
import InputText from "../components/inputs/InputText";
import EmptySpace from "../components/EmptySpace";
import { formatDate } from "../const/hours";
import Button from "../components/Button";
import { MdSend } from "react-icons/md";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CustomersQAClientProps {
  listings: SafeListing[],
  products: SafeProduct[],
  questions: any,
  currentUser?: SafeUser | null,
}

const CustomersQAClient: React.FC<CustomersQAClientProps> = ({
  listings,
  products,
  currentUser,
  questions,
}) => {

  useEffect(() => {
    if(questions){
      setCurrentQuestions(questions);
    }    
  }, [questions]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const router = useRouter();
    useEffect(() => {
      setIsLoading(false);
    }, [listings]);

const handleSendAnswer = useCallback((data:any) => {

  setIsLoading(true);
  axios.post(`/api/ask/listing/${data?.id}`, data)
  .then(() => {
    axios.post(`/api/notifications/${data?.id}`);
    toast.success('You answer has been sended!!!');
    router.refresh();
  })
  .catch(() => {
    toast.error('Something went wrong.');
  })
  .finally(() => {
    setIsLoading(false);
  })
},
[
currentQuestions,
currentUser,
]);


  

  return (
    <Container isLoading={isLoading}>
      <Heading
        title="Customers Q&A"
        subtitle="List of questions the customers have for you!"
      />
      {currentQuestions.length < 1 ?
        <EmptySpace title="There´s not questions yet." subtitle="Maybe later..." />
      :

      <div className="w-full md:w-2/3 mx-auto p-5 mb-20 bg-white rounded-lg shadow mt-5">
      {currentQuestions.map((item:any) => (

   
        <div key={item.id} className="mt-4">
            <div className="grid grid-cols-1 gap-4 w-full">
              <div className="flex flex-row">
                <span className="text-sm text-neutral-600 flex flex-row justify-between w-full">
                   <div className="md:ml-12 "> 
                      <b> {item.user }</b> is asking on 
                      <a className="text-green-600" href={`/listings/${item.listingId}`}> {item.listing}</a>
                    </div>
                    <i className="text-sm text-neutral-600 font-thin">
                      {formatDate(item.createdAt)}
                    </i>
                </span>
              </div>
            </div>
          <div>
            <div className="flex items-start">
              <div>
                <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-green-500 text-white font-medium text-sm">
                    Q
                </span>
              </div>

              <p className="ml-4 md:ml-6 text-bold">
                {item.question}
              </p>
            </div>

            <div className="flex items-start mt-3">
              <div>
                <span className="inline-flex justify-center items-center w-6 h-6 rounded bg-gray-200 text-gray-800 font-medium text-sm">
                    A
                </span>
              </div>

              <div className=" ml-4 md:ml-6 w-full">
                <InputText 
                  readonly={item.status == 1 ? true :false}
                  value={item.answer}
                  label=""
                  onChange={(e) => {
                    item.answer = e.target.value;
                    setCurrentQuestions([...currentQuestions]);
                  }}
                  rowsNumber={2}
                />
              </div>
            </div>
          </div>
        
          <div className="w-full flex items-end justify-end">
          {item.status == 1 ?
            <span className="text-red-500">Responded</span>
            :
            <FloatingButton color="bg-black" icon={MdSend} small label="" onClick={()=>{handleSendAnswer(item)}}/>
          }
          </div>
        </div>
        
        ))}
      </div>
  }
    </Container>
   );
}
 
export default CustomersQAClient;