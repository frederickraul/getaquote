'use client';

import { useEffect, useMemo, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { useRouter } from "next/navigation";

import InputUnregistered from '../inputs/InputUnregistered';

import useCountries from "@/app/hooks/useCountries";

import InputText from "../inputs/InputText";
import Form from "./Form";
import SelectVirtualized from "../inputs/SelectVirtualized";
import axios from "axios";
import ZipLookUp from "../zipcode/ZipLookUp";
import InputPhone from "../inputs/InputPhone";
import ValidateForm from "./ValidateForm";
import toast from "react-hot-toast";
import Button from "../Button";
import { allWheelsOption, catalyticOptions, ownershipOptions, paidOfOptions, vehicleConditionOptions, wheelsOptions } from "./const";
import Modal from "../modals/Modal";
import Image from "next/image";
import { yesNo } from "@/app/const/formOptions";


enum STEPS {
  DESCRIPTION = 1,
  PAIDOFF = 2,
  VEHICLECONDITION = 3,
  BODYDAMAGE = 4,
  OPERATION = 5,
  BATTERY = 6,
  ZIPCODE = 7,
  PHONE = 8,
  FINISH = 9,
  NOPAIDOFFMESSAGE = 11,
  DONE = 12,
}

const defaultOption = { label: '', value: '' };

const defaultValues = {
  year: defaultOption,
  make: defaultOption,
  model: defaultOption,
  ownershipDocument: defaultOption,
  paidOff: defaultOption,
  vehicleCondition: defaultOption,
  wheels: defaultOption,
  bodyDamage: defaultOption,
  partMissing: defaultOption,
  allWheels: defaultOption,
  battery: defaultOption,
  catalytic: defaultOption,
  vin: '',
  mileage: '',
  bodyDamageDescription: '',
  partMissingDescription: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
  formattedPhone: '',
  phone2: '',
  formattedPhone2: '',
  name: '',
  lastname:'',
  engine: ''

};

const defaultErrorValues = {
  year: false,
  make: false,
  model: false,
  ownershipDocument: false,
  paidOff: false,
  vehicleCondition: false,
  wheels: false,
  bodyDamage: false,
  partMissing: false,
  allWheels: false,
  battery: false,
  catalytic: false,
  vin: false,
  mileage: false,
  bodyDamageDescription: false,
  partMissingDescription: false,
  city: false,
  state: false,
  zip: false,
  phone: false,
  phone2: false,
  name: false,
  lastname: false,
  engine: false
};




interface ListingCardProps {
  makes: any
}
const QuoteForm: React.FC<ListingCardProps> = ({
  makes
}) => {
  const router = useRouter();

  const { getStateByValue } = useCountries();
  const [yearList, setYearList] = useState([defaultOption]);
  const [data, setData] = useState(defaultValues);
  const [makeList, setmakeList] = useState(makes);
  const [modelList, setModelList] = useState([defaultOption]);

  const [selectedMake, setSelectedMake] = useState(defaultOption);
  const [selectedModel, setSelectedModel] = useState(defaultOption);
  const [errors, setErrors] = useState(defaultErrorValues);
  const [isModalVinVisible, setisModalVinVisible] = useState(false);


  const handleZipcodeChange = (value: any) => {
    setData({ ...data, ['city']: value.city, ['state']: value.state_name, ['zip']: value.zip });

  }
  const handleInputChange = (field: string, value: any, value2?: any) => {
    if (field === 'phone') {
      setData({ ...data, [field]: value2,['formattedPhone']: value });

    }else if (field === 'phone2') {
      setData({ ...data, [field]: value2,['formattedPhone2']: value });

    }else if (field === 'vin') {
      const vinNumber = value.target.value;
      let uppercaseVIN = vinNumber.toUpperCase(); //To convert Upper Case
      setData({ ...data, [field]: uppercaseVIN });
      if (validateVin(vinNumber)) {
        setisVinValid(true);
        decodeVIN(vinNumber);
      } else {
        setisVinValid(false);
      }

    } else {
      setData({ ...data, [field]: value.target.value });
    }
  }

  const handleSelectChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
    if (field == 'make') {
     
      if (value === null) {
        setSelectedMake(defaultOption);
        setModelList([defaultOption]);
        setData({ ...data, [field]: defaultOption, ['model']: defaultOption });

      } else {
        setSelectedMake(value);
        setData({ ...data, [field]: value, ['model']: defaultOption });
      }
    } else {

      if (value === null) {
        setData({ ...data, [field]: defaultOption });
      } else {
        setData({ ...data, [field]: value });
      }

    }
  }

  const closeVinModal = () =>{
    setisModalVinVisible(false);
  }

  useEffect(() => {
    if(selectedMake.value == '') return;
    getModelList();
  }, [selectedMake]);

  //GET MODEL LIST
  const getModelList = async () => {
    try {
      const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/' + selectedMake.value + '?format=json');
      if (response) {
        const modelList = response.data.Results;
        const safeModels = modelList.map((model: any) => ({
          label: model.Model_Name,
          value: model.Model_ID
        }));
        setModelList(safeModels);
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }

  //DECODE VIN NUMBER
  const decodeVIN = async (VIN: string) => {
    try {
      const response = await axios.get(' https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + VIN + '?format=json');
      if (response) {
        const vinDetails = response.data.Results;
        // Filtering based on multiple properties
        const year = vinDetails.filter((item: any) => item.Variable === 'Model Year');
        const model = vinDetails.filter((item: any) => item.Variable === 'Model');
        const make = vinDetails.filter((item: any) => item.Variable === 'Make');
        // const engine = vinDetails.filter((item: any) => item.Variable === 'Engine Model');
        const cylinders = vinDetails.filter((item: any) => item.Variable === 'Engine Number of Cylinders');
        const liters = vinDetails.filter((item: any) => item.Variable === 'Displacement (L)');

        setSelectedMake({ value: make[0].ValueId, label: make[0].Value });
        
        const cylindersNo = cylinders[0]?.Value == null ? '' : cylinders[0]?.Value+"-Cyl, ";
        const litersNo = liters[0]?.Value == null ? '' : liters[0]?.Value+" Liters";
        // const engineDetails = cylindersNo+litersNo;
        const engineDetails = cylindersNo;
        setData({
          ...data,
          ['vin']: VIN,
          ['year']: { value: year[0].Value, label: year[0].Value },
          ['make']: { value: make[0].ValueId, label: make[0].Value },
          ['model']: { value: model[0].ValueId, label: model[0].Value },
          ['engine']: engineDetails,
        }
        );
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }


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



  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);

  const [isVinValid, setisVinValid] = useState(true);




  function validateVin(vin: string) {
    return validate(vin);
  }

    // source: https://en.wikipedia.org/wiki/Vehicle_identification_number#Example_Code
    // ---------------------------------------------------------------------------------
    function transliterate(c: string) {
      return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
    }

    function get_check_digit(vin: string) {
      var map = '0123456789X';
      var weights = '8765432X098765432';
      var sum = 0;
      for (var i = 0; i < 17; ++i)
        sum += transliterate(vin[i]) * map.indexOf(weights[i]);
      console.log(map[sum % 11]);
      return map[sum % 11];
    }

    function validate(vin: string) {
     
      if (vin.length !== 17) return false;
      return true;
      // return get_check_digit(vin) === vin[8];
    }
    // ---------------------------------------------------------------------------------
  



  const onBack = () => {
    if (step === STEPS.NOPAIDOFFMESSAGE) {
      setStep(STEPS.PAIDOFF);
    } else {
      setStep((value) => value - 1);
    }
  }

  const onNext = () => {
    if (step === STEPS.PAIDOFF && data.paidOff.value === 'No. I still owe some money for it.') {
      setStep(STEPS.NOPAIDOFFMESSAGE);
    } else {
      setStep((value) => value + 1);
    }
  }


  const onSubmit = (data: any) => {
    if (step !== STEPS.FINISH) {
      const errorCount = ValidateForm(step, STEPS, data, errors, setErrors);
      if (errorCount > 0) {
        return;
      }
      return onNext();
    }


    setIsLoading(true);

    axios.post('/api/cars', data)
      .then(() => {
        toast.success('Quote Created Wait For a Call!!!!', {
          duration: 8000,
          position: 'top-center',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#0BDA51',
            secondary: '#fff',
          },  
        });
        router.refresh();
        setStep(STEPS.DONE);
        setData(defaultValues);

      })
      .catch(() => {
        toast.error('Something went wrong.')
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.FINISH) {
      return 'Send';
    }

    if (step === STEPS.NOPAIDOFFMESSAGE) {
      return undefined;
    }

    if(step === STEPS.DONE){
      return undefined;
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return undefined;
    }

    if (step === STEPS.DONE) {
      return undefined;
    }

    return 'Back';
  }, [step]);


  const headContent = (
    <div className='my-5 sm:mb-10'>
        {step !== STEPS.DONE &&
          <div className='text-2xl sm:text-4xl lg:text-5xl font-bold mt-10 sm:mt-20 md:mt-10 capitalize'>Sell your car, running or Not.</div>
        }
    </div>
  );


  // DESCRIPTION STEP
  let bodyContent = (
    <>
      <div className="font-bold sm:text-lg mb-5" style={{fontWeight: 600}}>
        Answer a few questions to get an offer for your car today.
              </div>
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <InputUnregistered
              label="Please enter your VIN"
              //infoMessage="The vehicle ID number (VIN) can be found on the title, registration card, or insurance card. "
              //disabled={isLoading}
              value={data.vin}
              required
              error={errors.vin}
              onChange={(value) => { handleInputChange('vin', value) }} />
            <div className="flex flex-row justify-between -mt-2">
              <span className="text-sm font-bold text-blue-600 cursor-pointer" onClick={()=>{setisModalVinVisible(true)}}>Where do i find my VIN?</span>
            
            {data?.vin.length > 0 &&
               (isVinValid ?
                <span className='text-sm font-bold text-green-500 mr-5'>Valid VIN</span>
                :
                <span className='text-sm font-bold text-red-500 flex mr-5'>Invalid VIN</span>)
              
            }
           <Modal
           size="auto"
           isOpen={isModalVinVisible}
            body={<>    <Image
              priority={false} 
              sizes="100"
              height={500}
              width={250}
              alt="Logo"
              className="md:block cursor-pointer w-full sm:w-full md:w-[500px]"  
              src="/images/find-vin.svg"
              onClick={()=>{router.push('/')}} 
              quality={50}
              /></>}
            onClose={closeVinModal}
           />
            </div>

            <SelectVirtualized
              label='Year'
              required
              error={errors.year}
              options={yearList}
              value={data.year}
              onChange={(value) => { handleSelectChange('year', value) }}
            />


            <SelectVirtualized
              label='Make'
              required
              error={errors.make}
              options={makes}
              value={data.make}
              onChange={(value) => { handleSelectChange('make', value) }}
            />


            <SelectVirtualized
              label='Model'
              required
              error={errors.model}
              options={modelList}
              value={data.model}
              onChange={(value) => { handleSelectChange('model', value) }}
            />

            <InputUnregistered
              label='Engine'
              placeholder='4 Cyl'
              error={errors.engine}
              value={data.engine}
              required
              onChange={(value) => { handleInputChange('engine', value) }} />
          </div>
        </div>

      </div>
    </>
  )


  // CATEGORY STEP
  if (step === STEPS.PAIDOFF) {

    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

            <SelectVirtualized
              label='Is Your Vehicle Paid Off?'
              required
              error={errors.paidOff}
              options={paidOfOptions}
              value={data.paidOff}
              onChange={(value) => { handleSelectChange('paidOff', value) }} />

          <SelectVirtualized
              label='Ownership Documents'
              required
              error={errors.ownershipDocument}
              options={ownershipOptions}
              value={data.ownershipDocument}
              onChange={(value) => { handleSelectChange('ownershipDocument', value) }} />
          </div>
        </div>

      </div>
    )
  }

  // CATEGORY STEP
  if (step === STEPS.NOPAIDOFFMESSAGE) {

    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

            <h1 className="text-3xl pt-10 pb-10 font-bold">
              We are sorry, your car does not meet the requirements to be purchased by us.
            </h1>

          </div>
        </div>

      </div>
    )
  }

  // CATEGORY STEP
  if (step === STEPS.VEHICLECONDITION) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <InputUnregistered
              label="Vehicle Mileage?"
              placeholder='100,000'
              required
              error={errors.mileage}
              value={data.mileage}
              onChange={(value) => { handleInputChange('mileage', value) }} />


            <SelectVirtualized
              label='Vehicle Operating Condition?'
              required
              error={errors.vehicleCondition}
              options={vehicleConditionOptions}
              value={data.vehicleCondition}
              onChange={(value) => { handleSelectChange('vehicleCondition', value) }} />
  

            <SelectVirtualized
              label='Are Your Wheels Aluminum Or Steel?'
              required
              error={errors.wheels}
              options={wheelsOptions}
              value={data.wheels}
              onChange={(value) => { handleSelectChange('wheels', value) }} />


            <SelectVirtualized
              label='Does It Have All Wheels?'
              required
              error={errors.allWheels}

              options={allWheelsOption}
              value={data.allWheels}
              onChange={(value) => { handleSelectChange('allWheels', value) }} />




          </div>
        </div>

      </div>
    )
  }

  // ADDRESS STEP
  if (step === STEPS.BODYDAMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

            <SelectVirtualized
              label='Is There Any Body Damage?'
              required
              error={errors.bodyDamage}
              options={yesNo}
              value={data.bodyDamage}
              onChange={(value) => { handleSelectChange('bodyDamage', value) }} />


            {data.bodyDamage.value === 'Yes' && 
              <div>
              <InputText 
              error={errors.bodyDamageDescription}
              label="Please explain exactly what is damaged."
                value={data.bodyDamageDescription}
                onChange={(value) => { handleInputChange('bodyDamageDescription', value) }} />
             
                {/* {errors.bodyDamageDescription && 
                  <span className="text-red-500 font-bold text-sm -mt-3">Enter a description that is at least 10 letters long</span>} */}
               </div>
              
            
              }

          </div>
        </div>
      </div>
    )

  }




  // INFO STEP
  if (step === STEPS.OPERATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <SelectVirtualized
              label='Any Parts Missing?'
              required
              error={errors.partMissing}

              options={yesNo}
              value={data.partMissing}
              onChange={(value) => { handleSelectChange('partMissing', value) }} />



            {data.partMissing.value === 'Yes' &&
              <div>
              <InputText 
                error={errors.partMissingDescription}
                label="Please explain exactly what is missing or removed."
                value={data.partMissingDescription}
                onChange={(value) => { handleInputChange('partMissingDescription', value) }} />
                {/* {errors.partMissingDescription && 
                  <span className="text-red-500 font-bold text-sm -mt-3">Enter a description that is at least 10 letters long</span>} */}
            </div>
            }

          </div>
        </div>
      </div>
    )
  }


  // IMAGES STEP
  if (step === STEPS.BATTERY) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">


            <SelectVirtualized
              label='Does It Have A Battery?'
              required
              error={errors.battery}
              options={yesNo}
              value={data.battery}
              onChange={(value) => { handleSelectChange('battery', value) }} />

            <SelectVirtualized
              label='Catalytic Converter?'
              required
              error={errors.catalytic}
              options={catalyticOptions}
              value={data.catalytic}
              onChange={(value) => { handleSelectChange('catalytic', value) }} />

          </div>
        </div>

      </div>
    )
  }

  // IMAGES STEP
  if (step === STEPS.ZIPCODE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
   <div className="font-bold sm:text-2xl mb-0 mt-5">
        Vehicle's location?
      </div>
        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <ZipLookUp
              error={errors.zip}
              value={data.zip}
              onChange={handleZipcodeChange}
            />

            <InputUnregistered
              label="City"
              error={errors.city}
              disabled={isLoading}
              readonly={true}
              value={data.city}
              onChange={() => { }}
            />

            <InputUnregistered
              label="State"
              error={errors.state}
              disabled={isLoading}
              readonly={true}
              value={data.state}
              onChange={() => { }}
            />

          </div>
        </div>
      </div>
    )
  }

  // PHONE STEP
  if (step === STEPS.PHONE) {
    bodyContent = (

      <div className="flex flex-col gap-8">
      <div className="font-bold sm:text-2xl mt-0 mb-5">
        Seller's Contact Info
      </div>
        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <InputUnregistered
              label="Name"
              disabled={isLoading}
              required
              error={errors.name}

              value={data.name}
              onChange={(value) => { handleInputChange('name', value) }} />

            <InputUnregistered
              label="Last Name"
              disabled={isLoading}
              required
              error={errors.lastname}

              value={data.lastname}
              onChange={(value) => { handleInputChange('lastname', value) }} />



            <InputPhone
             label="Phone"
             required
              error={errors.phone}
              value={data.formattedPhone}
              onChange={(value,value2)=>{handleInputChange('phone',value,value2)}} />

            <InputPhone
              label="Alternative Phone"
              required
              error={errors.phone2}
              value={data.formattedPhone2}
              onChange={(value,value2)=>{handleInputChange('phone2',value,value2)}} />

             


          </div>
        </div>
      </div>
    )
  }

  // PRICE STEP
  if (step === STEPS.FINISH) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl pt-5 mb-10 font-bold">
          Are you ready to get an offer?<br />
          Press the send button!!!
        </h1>

      </div>
    )
  }

    // CATEGORY STEP
    if (step === STEPS.DONE) {

      bodyContent = (
        <div className="flex flex-col gap-8">
  
          <div className="flex flex-col">
            <div className="
                 gap-3 2xl:gap-4
                flex 
                flex-col 
                pr-5 3xl:pr-0 
                items-center
               ">
            <FaRegCheckCircle className="text-blue-500 mt-16" size={60}/>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold pt-10 pb-10 text-center">
                Thank you for sending us the details of your vehicle.
              </h1>

              <span className="-m-5 px-10 text-center text-lg font-bold">Someone from our buying departman will contact you soon!</span>

              <div className="font-bold text-2xl mt-10 w-[230px] text-center">
                Expect a call from (800) 440-1510
              </div>

              <div className="font-bold text-2xl">
                Monday-Sunday 9AM - 5PM
              </div>
             <a className="mt-5" href="/">
             <Button big label="Return to Main Site" styles="" borderless onClick={()=>{}}/>
             </a>
            </div>
          </div>
  
        </div>
      )
    }

  return (
    <div className="h[900px]">
      <Form
        isOpen={true}
        onSubmit={() => { onSubmit(data) }}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
        body={bodyContent}
        head={headContent}
        //size={step === STEPS.OPERATION ? 'lg' : 'md'}
        disabled={isLoading}
      />
    </div>
  )
}

export default QuoteForm