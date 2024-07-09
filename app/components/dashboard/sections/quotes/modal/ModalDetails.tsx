'use client';

import React, { useState } from "react";
import Item from "../view/Item";
import Tabs from "../view/Tabs";
import { FaCar } from "react-icons/fa";
import { MdContactPhone, MdOutlineTask } from "react-icons/md";
import { usePathName } from "../../../routes/hooks/usePathName";
import { BiCheckSquare } from "react-icons/bi";

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
    lastname,
    engine,
    phone2,
    price,
    price2,
    noOrder,
    buyerName,
    buyerEmail,
    address,
  } = data;

  const pathname = usePathName();

  const [selectedTab, setSelectedTab] = useState(1);

  let tabList = [
    {id:1, label:'Vehicle Details', icon: <FaCar/>},
    {id:2, label:'Contact', icon: <MdContactPhone/>},
  ]

  if(pathname !== '/dashboard/new'){
     tabList = [
      {id:3, label:'Order', icon: <MdOutlineTask/>},
      {id:1, label:'Vehicle Details', icon: <FaCar/>},
      {id:2, label:'Contact', icon: <MdContactPhone/>},
    ]
  }




  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const OrderInformation = (
    <>
      <Item label="Order Number:" value={noOrder} />
      <Item label="Price:" value={`$${price}`} />
      <Item label="Zeus Price:"  value={`$${price2}`} />
      <Item label="Buyer Name:" value={buyerName} />
      <Item label="Buyer Email:" value={buyerEmail} />
      <hr className="my-3"/>
      <Item label="Address:" value={address} />
      <Item label="City:" value={city} />
      <Item label="State:" value={state} />
      <Item label="Zip:" value={zip} />
    </>

  );

  const vehicleDetails = (
    <>
      <Item label="Vehicle:" value={year + " " + make + " " + model} />
      <Item label="Engine:" value={engine} />
      <Item label="Ownership Documents:" value={ownershipDocument} />
      <Item label="Is Your Vehicle Paid Off?" value={paidOff} />
      <Item label="Vehicle ID Number: " value={vin} />
      <Item label="Vehicle Mileage: " value={mileage} />
      <Item label="Vehicle Operating Condition:" value={vehicleCondition} />
      <Item label="Is There Body Damage:" value={bodyDamage + ". " + bodyDamageDescription} />
      <Item label="Any Parts Missing:" value={partMissing + ". " + partMissingDescription} />
      <Item label="Are Your Wheels Aluminum Or Steel?:" value={wheels} />
      <Item label="Does It Have All Wheels:" value={allWheels} />
      <Item label="Does It Have A Battery:" value={battery} />
      <Item label="Catalytic Converter: " value={catalytic} />
      <Item label="Vehicle Location: " value={city + ", " + state + " " + zip} />
    </>
  );


  const contactInformation = (
    <>
      <Item label="Name:" value={name} />
      <Item label="Last Name:" value={lastname} />
      <Item label="Phone:" value={phone} />
      <Item label="2nd Phone:" value={phone2} />
    </>

  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">

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
                      <div className="flex items-center justify-center">
                      <Tabs data={tabList} selected={selectedTab} onClick={handleTabChange} />
                      </div>
                    <div className="flex flex-row">
                      <div className="mt-2">
                          {selectedTab == 1 && vehicleDetails}
                      </div>
                      <div className="mt-2">
                      {selectedTab == 2 && contactInformation}
                      </div>

                      <div className="mt-2">
                      {selectedTab == 3 && OrderInformation}
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