'use client';

import React, { useState } from "react";
import Item from "./Item";
import Tabs from "./Tabs";

interface ListingCardProps {
  data: any;
  visible: boolean;
  onClose: () => void;
}

const QuoteDetails: React.FC<ListingCardProps> = ({
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
    engine,
    phone2,
  } = data;


  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }


  const vehicleDetails = (
    <>
      <Item label="Vehicle:" value={year + " " + make + " " + model} />
      <Item label="Engine:" value={engine} />
      <Item label="Ownership Documents:" value={ownershipDocument} />
      <Item label="Is Your Vehicle Paid Off?" value={paidOff} />
      <Item label="Vehicle ID Number: " value={vin} />
      <Item label="Vehicle Mileage: " value={mileage} />
      <Item label="Vehicle Operating Condition:" value={vehicleCondition} />
      <Item label="Is There Body Damage:" value={bodyDamage + " " + bodyDamageDescription} />
      <Item label="Any Parts Missing:" value={partMissing + " " + partMissingDescription} />
      <Item label="Are Your Wheels Aluminum Or Steel?:" value={wheels} />
      <Item label="Does It Have All Wheels:" value={allWheels} />
      <Item label="Does It Have A Battery:" value={battery} />
      <Item label="Catalytic Converter: " value={catalytic} />
      <Item label="Vehicle Location: " value={city + ", " + state + " " + zip} />
    </>
  );


  let contactInformation = (
    <>
      <Item label="Name:" value={name} />
      <Item label="Phone:" value={phone} />
      <Item label="2nd Phone:" value={phone2} />
    </>

  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="
            flex 
            min-h-full 
            items-end 
            justify-center 
            p-4 
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
                sm:my-8 
                sm:w-full 
                sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mb-5">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="flex flex-row">
                      <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                      <div className="flex">
                      <Tabs selected={selectedTab} onClick={handleTabChange} />
                      </div>
                    <div className="flex flex-row">
                      <div className="mt-2">
                          {selectedTab == 1 &&vehicleDetails}
                      </div>
                      <div className="mt-2">
                      {selectedTab == 2 && contactInformation}


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

export default QuoteDetails