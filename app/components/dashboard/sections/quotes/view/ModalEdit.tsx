'use client';

import React, { useEffect, useState } from "react";
import Item from "./Item";
import Tabs from "./Tabs";
import Field from "./Field";
import { Box } from "@mui/material";
import Button from "@/app/components/app/Button";
import { FaCar } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import Select from "./Select";
import { makeList } from "@/app/const/make";

interface ListingCardProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  handleInput: (field:string, value:string) => void;
}

const defaultOption = { label: '', value: '' };


const ModalEdit: React.FC<ListingCardProps> = ({
  data,
  visible,
  onClose,
  handleInput,
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
  const [yearList, setYearList] = useState([defaultOption]);

  const getYear = () => {
    const currentYear = new Date().getFullYear();
    let yearList = [];
    for (let i = currentYear; i >= 1930; i--) {
      yearList.push({ label: i.toString(), value: i.toString() });
    }
    yearList.push({ label: 'Older', value: 'older' });
    setYearList(yearList);
  }


  useEffect(() => {
    getYear();
  }, [])

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const tabList = [
    {id:1, label:'Vehicle Details', icon: <FaCar/>},
    {id:2, label:'Contact Information', icon: <MdContactPhone/>},
  ]



  const vehicleDetails = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <Select options={yearList} onChange={(value)=>{handleInput('year', value)}} label="Year:" value={year} />
      <Field onChange={(value)=>{handleInput('make', value)}} label="Make:" value={make} />
      <Field onChange={(value)=>{handleInput('model', value)}} label="Model:" value={model} />
      <Field onChange={(value)=>{handleInput('engine',value)}} label="Engine:" value={engine} />
      <Field onChange={(value)=>{handleInput('ownershipDocument',value)}} label="Ownership Documents:" value={ownershipDocument} />
      <Field onChange={(value)=>{handleInput('paidOff',value)}}  label="Is Your Vehicle Paid Off?" value={paidOff} />
      <Field onChange={(value)=>{handleInput('vin',value)}} label="Vehicle ID Number: " value={vin} />
      <Field onChange={(value)=>{handleInput('mileage',value)}}  label="Vehicle Mileage: " value={mileage} />
      <Field onChange={(value)=>{handleInput('vehicleCondition',value)}}  label="Vehicle Operating Condition:" value={vehicleCondition} />
      <Field onChange={(value)=>{handleInput('bodyDamage',value)}}  label="Is There Body Damage:" value={bodyDamage + ". " + bodyDamageDescription} />
      <Field onChange={(value)=>{handleInput('year',value)}}  label="Any Parts Missing:" value={partMissing + ". " + partMissingDescription} />
      <Field onChange={(value)=>{handleInput('year',value)}}  label="Are Your Wheels Aluminum Or Steel?:" value={wheels} />
      <Field onChange={(value)=>{handleInput('year',value)}} label="Does It Have All Wheels:" value={allWheels} />
      <Field onChange={(value)=>{handleInput('year',value)}} label="Does It Have A Battery:" value={battery} />
      <Field onChange={(value)=>{handleInput('year',value)}} label="Catalytic Converter: " value={catalytic} />
      <Field onChange={(value)=>{handleInput('year',value)}} label="Vehicle Location: " value={city + ", " + state + " " + zip} />
      </Box>
    </>
  );


  const contactInformation = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Field onChange={(value)=>{handleInput('name',value)}} label="Name:" value={name} />
      <Field onChange={(value)=>{handleInput('phone',value)}} label="Phone:" value={phone} />
      <Field onChange={(value)=>{handleInput('phone2',value)}} label="2nd Phone:" value={phone2} />
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
            w-screen 
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
                          {selectedTab == 1 && vehicleDetails}
                      </div>
                      <div className="mt-2">
                      {selectedTab == 2 && contactInformation}
                      </div>
                    </div>
                    <div className="mt-1 border-t-2 pt-5 flex">
                        <Button label="Update" onClick={()=>{alert('soon')}} full/>
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