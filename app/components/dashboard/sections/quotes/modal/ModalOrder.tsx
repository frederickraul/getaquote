'use client';

import React, { useEffect, useState } from "react";
import Item from "../view/Item";
import Tabs from "../view/Tabs";
import Field from "../../../components/input/Field";
import { Box } from "@mui/material";
import Button from "@/app/components/app/Button";
import { MdOutlineTask } from "react-icons/md";
import Select from "../view/Select";
import { sellTypeList } from "@/app/const/sellType";

interface ModalProps {
  data: any;
  error?:boolean;
  visible: boolean;
  onClose: () => void;
  handleInput: (field:string, value:string) => void;
  handleZip: (value:any) => void;
  handleSelect: (field:string, value:string) => void;
  handleSubmit: () => void;

}

const ModalOrder: React.FC<ModalProps> = ({
  data,
  error,
  visible,
  onClose,
  handleInput,
  handleSubmit,
  handleSelect,
  handleZip
}) => {

  const {
    noOrder,
    price,
    sellType,
    price2,
    address,
    zip,
    state,
    city
  } = data;

  const [allZipCodes, setAllZipCodes] = useState([{state_name:'',city:'',zip:''}]);
  const [lookupHappened, setLookupHappened] = useState(false);



  useEffect(() => {
    fetch('/zipCodesUSA.json')
        .then(response => response.json())
        .then(result => {
            const zipCodes = result.map((item:any) => {
                return item;
            });
            setAllZipCodes(zipCodes);
        });
}, []);


const handleZipChange = (a:string) => {
  let val = a.replace(/[^\d]/, '');

  if (val.length < 6) {
    handleZip({state_name:'',city:'',zip:val});
      
  }
  if (val.length < 5 && lookupHappened) {
    handleZip({state_name:'',city:'',zip:val});
     setLookupHappened(false);
 }
  if (val.length === 5) {
      const entry = allZipCodes.filter(item => {
          return item['zip'].toLowerCase().includes(val.toLowerCase())
      });
      
      if (entry.length === 0) {

          handleZip({state_name:'No entry found',city:'No entry found'});
          setLookupHappened(true);
          setTimeout(() => { // clear the fields in 2 seconds after showing 'No entry found'

              handleZip({state_name:'',city:'',zip:val});
          }, 2000);
      } else if (entry.length >= 1) {
         
          setLookupHappened(true);
          handleZip(entry[0]);
      } 
      // else {
      //     setState('More than one match');
      //     setCity('More than one match');
      //     setLookupHappened(true);
      // }
  }
};

  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const tabList = [
    {id:1, label:'Order', icon: <MdOutlineTask/>},
  ]




  const orderNumber = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Field required onChange={(value)=>{handleInput('noOrder', value)}} label="Orden Number:" value={noOrder || ""} />
      <Select
                        label="Sell Type"
                        value={sellType || ""}
                        options={sellTypeList}
                        onChange={(e)=>{handleInput('sellType',e)}} 
                      />
                      <Field
                        label="Price"
                        value={price || ""}
                        price
                        required
                        onChange={(e)=>{handleInput('price',e)}} 
                      />
                      <Field 
                        label="Zeus Price:" 
                        value={price2 || ""} 
                        price 
                        required 
                        onChange={(value)=>{handleInput('price2', value)}} 
                      />

                      <Field 
                        label="Address:" 
                        value={address || ""} 
                        required 
                        onChange={(value)=>{handleInput('address', value)}} 
                      />

<Field onChange={(value)=>{handleZipChange(value)}} 
      required
      label="Zip: " 
      value={zip || ''} />

      <Field onChange={(value)=>{handleInput('state',value)}} 
      required
      label="State: " 
      value={state || ''} />

      <Field onChange={(value)=>{handleInput('city',value)}} 
      required
      label="City: " 
      value={city || ''} />
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
                        <Button label="Update" onClick={handleSubmit} full/>
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

export default ModalOrder