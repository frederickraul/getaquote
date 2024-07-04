'use client';

import React, { useState } from "react";
import Item from "../view/Item";
import Tabs from "../view/Tabs";
import { FaCar } from "react-icons/fa";
import { MdContactPhone, MdOutlineTask } from "react-icons/md";
import { usePathName } from "../../../routes/hooks/usePathName";
import { BiCheckSquare } from "react-icons/bi";
import { IoMailOpenOutline } from "react-icons/io5";

interface ListingCardProps {
  data: any;
  visible: boolean;
  onClose: () => void;
}

const ModalDetails: React.FC<ListingCardProps> = ({
  data,
  visible,
  onClose,
}) => {

  const {
   name,email,phone,address
  } = data;

  const pathname = usePathName();

  const [selectedTab, setSelectedTab] = useState(1);

  let tabList = [
    {id:1, label:'Buyer', icon: <IoMailOpenOutline/>},
   
  ]
  
  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const Information = (
    <>
      <Item label="Email: " value={email} />
      <Item label="Business Name: " value={name} />
      <Item label="Address: " value={address} />
      <Item label="Phone: "  value={phone} />
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
                w-full 
                sm:max-w-lg
                md:max-w-xl"
                >
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
                      <div className="flex ">
                      <Tabs data={tabList} selected={selectedTab} onClick={handleTabChange} />
                      </div>
                    <div className="flex flex-row">
                      <div className="mt-2">
                          {selectedTab == 1 && Information}
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

export default ModalDetails