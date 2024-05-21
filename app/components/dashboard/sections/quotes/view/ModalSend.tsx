'use client';

import React, { useState } from "react";
import Item from "./Item";
import Tabs from "./Tabs";
import { FaCar } from "react-icons/fa";
import { MdContactPhone, MdEmail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import Field from "./Field";
import Select from "./Select";
import { emailList } from "@/app/const/emails";
import Button from "@/app/components/app/Button";
import { BiSend } from "react-icons/bi";

interface MadalProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  handleInput: (field:string, value:any) => void;
  handleSubmit: () => void;
}

const ModalSend: React.FC<MadalProps> = ({
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
    sign,
    pickedUp,
    droppedOff,
  } = data;


  const [selectedTab, setSelectedTab] = useState(1);

  const handleOnChange= (value:any)=>{
    console.log(value);
  }

  const vehicleDetails = (
    <>
      <Item label="Vehicle:" value={year + " " + make + " " + model} />
      <Item label="Vehicle ID Number: " value={vin} />
      {/* <Item label="Ownership Documents:" value={ownershipDocument} />
      <Item label="Is Your Vehicle Paid Off?" value={paidOff} />
      <Item label="Vehicle Mileage: " value={mileage} />
      <Item label="Vehicle Operating Condition:" value={vehicleCondition} />
      <Item label="Is There Body Damage:" value={bodyDamage + ". " + bodyDamageDescription} />
      <Item label="Any Parts Missing:" value={partMissing + ". " + partMissingDescription} />
      <Item label="Are Your Wheels Aluminum Or Steel?:" value={wheels} />
      <Item label="Does It Have All Wheels:" value={allWheels} />
      <Item label="Does It Have A Battery:" value={battery} />
      <Item label="Catalytic Converter: " value={catalytic} />
      <Item label="Vehicle Location: " value={city + ", " + state + " " + zip} /> */}
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
                      <span className="ml-2 font-bold text-2xl"> Send Email  </span>
                      </div>
                    <div className="mt-5">
                      <Select
                        label="To"
                        value={buyer}
                        options={emailList}
                        onChange={(e)=>{handleInput('buyer',e)}} 
                      />
                      <Field
                        label="Subject"
                        value={subject}
                        required
                        onChange={(e)=>{handleInput('subject',e)}} 
                      />
                      <Field
                        label="Picked Up"
                        value={pickedUp}
                        required
                        price
                        onChange={(e)=>{handleInput('pickedUp',e)}} />
                      <Field
                        label="Dropped Off"
                        value={droppedOff}
                        required
                        price
                        onChange={(e)=>{handleInput('droppedOff',e)}} />
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

export default ModalSend