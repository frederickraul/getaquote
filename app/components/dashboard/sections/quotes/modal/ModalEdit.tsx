'use client';

import React, { useCallback, useEffect, useState } from "react";
import Item from "../view/Item";
import Tabs from "../view/Tabs";
import Field from "../../../components/input/Field";
import { Box } from "@mui/material";
import Button from "@/app/components/app/Button";
import { FaCar } from "react-icons/fa";
import { MdContactPhone } from "react-icons/md";
import Select from "../view/Select";
import { makeList } from "@/app/const/make";
import axios from "axios";
import toast from "react-hot-toast";
import { yesNo } from "@/app/const/formOptions";
import { allWheelsOption, catalyticOptions, ownershipOptions, paidOfOptions, vehicleConditionOptions } from "@/app/components/app/Form/const";

interface ListingCardProps {
  data: any;
  visible: boolean;
  onClose: () => void;
  refresh: () => void;
  handleInput: (field:string, value:string) => void;
  setisLoading: (value:boolean) => void;
}

const defaultOption = { label: '', value: '' };

const ModalEdit: React.FC<ListingCardProps> = ({
  data,
  visible,
  onClose,
  refresh,
  handleInput,
  setisLoading,
}) => {

  const [selectedTab, setSelectedTab] = useState(1);
  // const [yearList, setYearList] = useState([defaultOption]);
  const [quote, setquote] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    setquote(data);

  }, [data]);
  

  // const getYear = () => {
  //   const currentYear = new Date().getFullYear();
  //   let yearList = [];
  //   for (let i = currentYear; i >= 1930; i--) {
  //     yearList.push({ label: i.toString(), value: i.toString() });
  //   }
  //   yearList.push({ label: 'Older', value: 'older' });
  //   setYearList(yearList);
  // }


  // useEffect(() => {
  //   getYear();
  // }, [])

  const handleTabChange = (tab: number) => {
    setSelectedTab(tab);
  }

  const tabList = [
    {id:1, label:'Vehicle Details', icon: <FaCar/>},
    {id:2, label:'Contact Information', icon: <MdContactPhone/>},
  ]



  const handleInputChange = (field: string, value: any) => {
    setquote({ ...quote, [field]: value });
}

const handleSelectChange = (field: string, item: any) => {
  const value = item;
  setquote({ ...quote, [field]: value });
}

 const handleUpdate = useCallback(() => {

    setError(false);

  
    onClose();
    setisLoading(true);
    axios.post(`/api/cars/${quote?.id}`,quote)
    .then(() => {
      toast.success("Quote info updated!!!", {
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
  }, [error,quote]);


  const vehicleDetails = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

      <Field onChange={(value)=>{handleInputChange('year', value)}} 
      required
      label="Year:" 
      value={quote.year || ''} />

      <Field onChange={(value)=>{handleInputChange('make', value)}} 
      required
      label="Make:" 
      value={quote.make || ''} />

      <Field onChange={(value)=>{handleInputChange('model', value)}} 
      required
      label="Model:" 
      value={quote.model || ''} />

      <Field onChange={(value)=>{handleInputChange('engine',value)}} 
      required
      label="Engine:" 
      value={quote.engine || ''} />

      <Select options={ownershipOptions} onChange={(value)=>{handleSelectChange('ownershipDocument',value)}} 
      label="Ownership Documents:" 
      value={quote.ownershipDocument || ''} />

      <Select options={paidOfOptions} onChange={(value)=>{handleSelectChange('paidOff',value)}}  
      label="Is Your Vehicle Paid Off?" 
      value={quote.paidOff || ''} />

      <Field onChange={(value)=>{handleInputChange('vin',value)}} 
      required
      label="Vehicle ID Number: " 
      value={quote.vin || ''} />

      <Field onChange={(value)=>{handleInputChange('mileage',value)}}  
      required
      label="Vehicle Mileage: " 
      value={quote.mileage || ''} />

      <Select options={vehicleConditionOptions} onChange={(value)=>{handleInputChange('vehicleCondition',value)}}  
      label="Vehicle Operating Condition:" 
      value={quote.vehicleCondition || ''} />

      <Select options={yesNo} onChange={(value)=>{handleSelectChange('bodyDamage',value)}}  
      label="Is There Body Damage:" 
      value={quote.bodyDamage || 'No'} />

      {quote.bodyDamage == 'Yes' &&

      <Field onChange={(value)=>{handleInputChange('bodyDamageDescription',value)}}  
      required
      label="Body Damage Description:" 
      value={quote.bodyDamageDescription || ''} />
      }

      <Select options={yesNo} onChange={(value)=>{handleSelectChange('partMissing',value)}}  
      label="Any Parts Missing:" 
      value={quote.partMissing || 'Yes'} />

      {quote.partMissing == 'Yes' &&
      <Field onChange={(value)=>{handleInputChange('partMissingDescription',value)}}  
      required
      label="Any Parts Description:" 
      value={quote.partMissingDescription || ''} />
      }

      <Field onChange={(value)=>{handleInputChange('wheels',value)}}  
      required
      label="Are Your Wheels Aluminum Or Steel?:" 
      value={quote.wheels || ''} />

      <Select options={allWheelsOption} onChange={(value)=>{handleInputChange('allWheels',value)}} 
      label="Does It Have All Wheels:" 
      value={quote.allWheels || ''} />

      <Select options={yesNo} onChange={(value)=>{handleInputChange('battery',value)}} 
      label="Does It Have A Battery:" 
      value={quote.battery || ''} />

      <Select options={catalyticOptions} onChange={(value)=>{handleInputChange('catalytic',value)}} 
      label="Catalytic Converter: " 
      value={quote.catalytic || ''} />

      <Field onChange={(value)=>{handleInputChange('zip',value)}} 
      required
      label="Zip: " 
      value={quote.zip || ''} />

      <Field onChange={(value)=>{handleInputChange('state',value)}} 
      required
      label="State: " 
      value={quote.state || ''} />

      <Field onChange={(value)=>{handleInputChange('city',value)}} 
      required
      label="City: " 
      value={quote.city || ''} />
      </Box>
    </>
  );


  const contactInformation = (
    <>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Field onChange={(value)=>{handleInput('name',value)}} label="Name:" value={quote.name} />
      <Field onChange={(value)=>{handleInput('phone',value)}} label="Phone:" value={quote.phone} />
      <Field onChange={(value)=>{handleInput('phone2',value)}} label="2nd Phone:" value={quote.phone2} />
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
                          {selectedTab == 1 && vehicleDetails}
                      </div>
                      <div className="mt-2">
                      {selectedTab == 2 && contactInformation}
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