'use client';

import React, { useCallback, useEffect, useState } from "react";
import Tabs from "../view/Tabs";
import { Box } from "@mui/material";
import Button from "@/app/components/app/Button";
import Field from "../../../components/input/Field";
import { IoMailOpenOutline } from "react-icons/io5";
import InputPhone from "../../../components/input/InputPhone";
import axios from "axios";
import toast from "react-hot-toast";

interface ListingCardProps {
  data: any;
  visible: boolean;
  setisLoading:(value:boolean) =>void;
  onClose: () => void;
  refresh: () => void;
}

const ModalEdit: React.FC<ListingCardProps> = ({
  data,
  visible,
  onClose,
  refresh,
  setisLoading,
}) => {

  const [selectedTab, setSelectedTab] = useState(1);
  const [buyer, setBuyer] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    setBuyer(data);
  }, [data])

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  let tabList = [
    {id:1, label:'Buyer', icon: <IoMailOpenOutline/>},
   
  ]

  const handleInputChange = (field: string, value: any) => {
    setBuyer({ ...buyer, [field]: value });
}

 const handleUpdate = useCallback(() => {
    setError(false);

  
    if(buyer.email === null || buyer.name === null || buyer.phone === null){
      setError(true);
      return;
    }
  
    if(buyer.email === '' || buyer.name === '' || buyer.phone === ''){
      setError(true);
      return;
    }
  
    onClose();
    setisLoading(true);
    axios.post(`/api/buyer/${buyer?.id}`,buyer)
    .then(() => {
      toast.success("Buyer info updated!!!", {
        duration: 5000,
        position: 'top-center',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#54B4D3',
          secondary: '#fff',
        },  
      });
      
    refresh();      
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setisLoading(false);
  
    })
  }, [error,buyer]);
  
  

  const Information = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <Field required onChange={(value)=>{handleInputChange('email', value)}} label="Email:" value={buyer.email ||''} />
      <Field required onChange={(value)=>{handleInputChange('name', value)}} label="Name:" value={buyer.name ||''} />
      <InputPhone required onChange={(value)=>{handleInputChange('phone', value)}} label="Phone:" value={buyer.phone ||''}/>     
      <span className="text-red-500 font-bold text-right w-full">{error && 'All fields are required'}</span>

      </Box>
    </>
  );


  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="
            fixed 
            inset-0 
            bg-gray-500 
            bg-opacity-75 
            transition-opacity">
        <div className="
            fixed 
            inset-0 
            z-10 
            overflow-y-auto">
          <div className="
            flex 
            min-h-full 
            items-start 
            justify-center 
            p-2
            text-center 
            sm:items-start 
            sm:p-0">

            <div className="
                relative 
                transform 
                overflow-hidden 
                rounded-lg 
                bg-white 
                text-left 
                shadow-xl 
                transition-all 
                my-0
                sm:my-8 
                sm:w-full 
                sm:max-w-lg">
              <div className="
                  bg-white 
                  px-4 
                  pb-4 
                  pt-5 
                  sm:p-6 
                  sm:pb-4">
                <div className="mb-5">
                  <div className="mt-3 sm:ml-4 sm:mt-0 ">
                    <div className="flex flex-row">
                      <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                      <div className="flex">
                      <Tabs data={tabList} selected={selectedTab} onClick={handleTabChange} />
                      </div>
                    <div className="">
                      <div className="mt-2">
                          {selectedTab == 1 && Information}
                      </div>
                    </div>
                    <div className="mt-1 border-t-2 pt-5 flex">
                        <Button label="Update" onClick={handleUpdate} full/>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ModalEdit