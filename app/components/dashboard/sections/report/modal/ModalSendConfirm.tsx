'use client';

import React, { useState } from "react";
import Item from "../view/Item";
import { MdEmail } from "react-icons/md";
import Select from "../view/Select";
import { emailList } from "@/app/const/emails";
import Button from "@/app/components/app/Button";
import { BiSend } from "react-icons/bi";
import Field from "../../../components/input/Field";

interface ModalProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  handleInput: (field:string, value:any) => void;
  handleSubmit: () => void;
}

const ModalSendConfirm: React.FC<ModalProps> = ({
  data,
  visible,
  onClose,
  handleInput,
  handleSubmit
}) => {

  const {
    year,
    make,
    model,
    ownershipDocument,
    paidOff,
    vehicleCondition,
    wheels,
    bodyDamage,
    partMissing,
    allWheels,
    battery,
    catalytic,
    vin,
    mileage,
    bodyDamageDescription,
    partMissingDescription,
    city,
    state,
    zip,
    phone,
    name,
    engine,
    phone2,
    buyer,
    subject,
    message,
    noOrder,
    price,
    price2,
    sign,
    sellType,
    buyerEmail,
  } = data;


  const [selectedTab, setSelectedTab] = useState(1);

  const vehicleDetails = (
    <>
    <Item label="Order:" value={`#${noOrder}`} />
    <Item label={`${sellType}: `} value={`$${price}`}/>
    <Item label={`Zeus: `} value={`$${price2}`}/>
    <div className="font-bold mt-5">Vehicle Details</div>
    <Item label="Vehicle:" value={year + " " + make + " " + model} />
    <Item label="Vehicle ID Number: " value={vin} />
     
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
            w-screen 
            overflow-y-auto">
          <div className="
            flex 
            min-h-full 
            items-start 
            justify-center 
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
                sm:w-full 
                sm:max-w-lg">
              <div className="
                  bg-white 
                  px-4 
                  pb-4 
                  
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
                      <div className="flex flex-row items-center">
                      <MdEmail size={26}/>
                      <span className="ml-2 font-bold text-2xl"> Send Confirm Email  </span>
                      </div>
                      <span className="text-xs text-neutral-500">Once the seller confirm the price.</span>
                    <div className="mt-5">
                      <Select
                        label="To"
                        value={buyerEmail}
                        options={emailList}
                        onChange={(e)=>{handleInput('buyerEmail',e)}} 
                      />
                      <Field
                        label="Subject"
                        value={subject}
                        required
                        onChange={(e)=>{handleInput('subject',e)}} 
                      />
                    
                      <Field
                        label="Sign"
                        value={sign}
                        required
                        onChange={(e)=>{handleInput('sign',e)}} />

                      
                    </div>
                    <div className="flex flex-row">
                      <div className="mt-2 px-5">
                          {selectedTab == 1 && vehicleDetails}
                      </div>
                    </div>
                    <div className="flex mt-5 flex-row justify-end">
                      <div className="w-full"> 
                      <Button 
                        full
                        label="Send"
                        icon={BiSend}
                        onClick={handleSubmit}
                      />
                      </div>
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

export default ModalSendConfirm