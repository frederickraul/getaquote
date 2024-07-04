'use client';

import React, { useCallback, useState } from "react";
import Item from "../view/Item";
import Tabs from "../view/Tabs";
import { Box } from "@mui/material";
import Button from "@/app/components/app/Button";
import { MdOutlineTask } from "react-icons/md";
import Select from "../view/Select";
import { sellTypeList } from "@/app/const/sellType";
import InputPhone from "../../../components/input/InputPhone";
import Field from "../../../components/input/Field";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModalProps {
  visible: boolean;
  setisLoading: (value:boolean) => void;
  onClose: () => void;
  handleSubmit: (value:any) => void;

}

const ModalAddBuyer: React.FC<ModalProps> = ({
  visible,
  setisLoading,
  onClose,
  handleSubmit,
}) => {


  const defaultValue = {name:'',email:'',phone:'',address:''};
  const [selectedTab, setSelectedTab] = useState(1);
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(false);



  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const handleInput = (field: string, value: any) => {
    console.log(value);
    setData({ ...data, [field]: value });
}

  const onSubmit = () =>{
    setError(false);
  if(data.email == '' || data.name == '' || data.phone == ''){
    setError(true);
    return;
  }
    handleSubmit(data);
    setData(defaultValue);
  }


  const tabList = [
    { id: 1, label: 'Buyer info', icon: <MdOutlineTask /> },
  ]

  const orderNumber = (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Field 
          label="Email" 
          
          value={data.email} 
          required 
          onChange={(value) => { handleInput('email', value) }} 
          />

        <Field
          label="Business Name"
          value={data.name}
          required
          onChange={(e) => { handleInput('name', e) }}
        />

        <Field
          label="Address"
          value={data.address}
          onChange={(e) => { handleInput('address', e) }}
        />

        <InputPhone 
          label="Phone"
          value={data.phone}
          onChange={(e) => { handleInput('phone', e) }}
        />
       
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
                          {selectedTab == 1 && orderNumber}
                        </div>
                      </div>
                      <div className="mt-1 border-t-2 pt-5 flex">
                        <Button label="Continue" onClick={onSubmit} full />
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

export default ModalAddBuyer