'use client';

import { useEffect, useMemo, useState } from "react";
import Heading from '../Heading';

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


enum STEPS {
  DESCRIPTION = 1,
  PAIDOFF = 2,
  VEHICLECONDITION = 3,
  BODYDAMAGE = 4,
  OWNERSHIP = 5,
  OPERATION = 6,
  BATTERY = 7,
  ZIPCODE = 8,
  PHONE = 9,
  FINISH = 10,
  NOPAIDOFFMESSAGE = 11,
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
  name: '',
  engine:''

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
  formattedPhone: false,
  name: false,
  engine:false
};


const ownershipOptiones = [
  { label: 'I Have A Clean Title.', value: 'I Have A Clean Title.' },
  { label: 'I Have A Salvage Title.', value: 'I Have A Salvage Title.' },
  { label: 'I Only Have The Registration.', value: 'I Only Have The Registration.' },
  { label: 'I Have Lien-Sale Paperwork.', value: 'I Have Lien-Sale Paperwork.' },
  { label: 'I Have A Junk Slip.', value: 'I Have A Junk Slip.' },
  { label: "I Don't Have Any Papers, But The Vehicle Is Registered In My Name.", value: "I Don't Have Any Papers, But The Vehicle Is Registered In My Name." },
  { label: 'Other', value: 'Other' },
];

const paidOfOptions = [
  { label: 'Yes. I own it outright.', value: 'Yes' },
  { label: 'No. I still owe some money for it.', value: 'No' },
];

const vehicleConditionOptions = [
  { label: "Not Running.", value: "Not Running." },
  { label: "Runs and Drives.", value: "Runs and Drives." },
  { label: "Starts Doesn't Drive.", value: "Starts Doesn't Drive." },
  { label: "Vehicle Has Fire Damage.", value: "Vehicle Has Fire Damage." },
  { label: "Vehicle Has Flood Damage.", value: "Vehicle Has Flood Damage." },
  { label: "Runs and Drives, Overheats.", value: "Runs and Drives, Overheats." },
  { label: "Runs and Drives, Not Passing Smog. ", value: "Runs and Drives, Not Passing Smog. " },
  { label: "Runs and Drives, Has Brake Problems.", value: "Runs and Drives, Has Brake Problems." },
  { label: "Runs and Drives, Has Engine Problems.", value: "Runs and Drives, Has Engine Problems." },
  { label: "Runs and Drives, Has Blown Head Gasket.", value: "Runs and Drives, Has Blown Head Gasket." },
  { label: "Runs and Drives, Has Transmission Problems.", value: "Runs and Drives, Has Transmission Problems." },
  { label: "Runs and Drives, Has Bad Battery or Alternator.", value: "Runs and Drives, Has Bad Battery or Alternator." },
];

const wheelsOptions = [
  { label: "Alumium", value: "Alumium" },
  { label: "Not Alumium", value: "Not Alumium" },
]

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


  const handleZipcodeChange = (value: any) => {
    console.log(value);
    setData({ ...data, ['city']: value.city, ['state']: value.state_name, ['zip']: value.zip });

  }
  const handleInputChange = (field: string, value: any, value2?: any) => {
    if (field === 'phone') {
      console.log(value);
      console.log(value2);
      setData({ ...data, [field]: value, ['formattedPhone']: value2 });

    } else if (field === 'vin') {
      const vinNumber = value.target.value;
      setData({ ...data, [field]: vinNumber });
      console.log(vinNumber);
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
    console.log(value);
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
     
        if(value === null){
          setData({ ...data, [field]: defaultOption });
        }else{
          setData({ ...data, [field]: value });
        }
      
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  useEffect(() => {
    console.log(errors);
  }, [errors])





  useEffect(() => {
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
        console.log(vinDetails);
        const year = vinDetails.filter((item: any) => item.Variable === 'Model Year');
        const model = vinDetails.filter((item: any) => item.Variable === 'Model');
        const make = vinDetails.filter((item: any) => item.Variable === 'Make');
        const engine = vinDetails.filter((item: any) => item.Variable === 'Engine Model');

        setSelectedMake({ value: make[0].ValueId, label: make[0].Value });
        console.log(year[0].Value);
        console.log(model[0].Value);
        console.log(make[0].Value);
        console.log(engine[0]?.Value);
        setData({
          ...data,
          ['vin']: VIN,
          ['year']: { value: year[0].Value, label: year[0].Value },
          ['make']: { value: make[0].ValueId, label: make[0].Value },
          ['model']: { value: model[0].ValueId, label: model[0].Value },
          ['engine']: engine[0]?.Value,
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

  const [isVinValid, setisVinValid] = useState(false);




  function validateVin(vin: string) {
    return validate(vin);


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
      return map[sum % 11];
    }

    function validate(vin: string) {
      if (vin.length !== 17) return false;
      return get_check_digit(vin) === vin[8];
    }
    // ---------------------------------------------------------------------------------
  }



  const onBack = () => {
    if (step === STEPS.NOPAIDOFFMESSAGE) {
      setStep(STEPS.PAIDOFF);
    } else {
      setStep((value) => value - 1);
    }
  }

  const onNext = () => {
    if (step === STEPS.PAIDOFF && data.paidOff.value === 'No') {
      setStep(STEPS.NOPAIDOFFMESSAGE);
    } else {
      setStep((value) => value + 1);
    }
  }


  const onSubmit = (data: any) => {
    if (step !== STEPS.FINISH) {
      const errorCount = ValidateForm(step ,STEPS, data, errors,setErrors);
      if( errorCount > 0){
        return;
      }
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/cars', data)
      .then(() => {
        toast.success('Quote Created Wait For a Call');
        router.refresh();
        setStep(STEPS.DESCRIPTION);
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

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return undefined;
    }

    return 'Back';
  }, [step]);




  // DESCRIPTION STEP
  let bodyContent = (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col ">
        <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
          <InputUnregistered
            label="Please enter your VIN"
            //disabled={isLoading}
            value={data.vin}
            required
            onChange={(value) => { handleInputChange('vin', value) }} />
          <div className="flex flex-row">

          {isVinValid ?
            <span className='text-sm font-bold text-green-500 mr-5'>Valid VIN</span>
            :
            <span className='text-sm font-bold text-red-500 flex mr-5'>Invalid VIN</span>
          }

          {errors.vin && <span className='flex text-sm font-bold text-red-500'> Required</span>}
          </div>

          <SelectVirtualized
            label='Year'
            required
            options={yearList}
            value={data.year}
            onChange={(value) => { handleSelectChange('year', value) }}
          />
          {errors.year && <span className='text-sm font-bold text-red-500'>Required</span>}

          <SelectVirtualized
            label='Make'
            required
            options={makes}
            value={data.make}
            onChange={(value) => { handleSelectChange('make', value) }}
          />
          {errors.make && <span className='text-sm font-bold text-red-500'>Required</span>}

          <SelectVirtualized
            label='Model'
            required
            options={modelList}
            value={data.model}
            onChange={(value) => { handleSelectChange('model', value) }}
          />

           {errors.model && <span className='text-sm font-bold text-red-500'>Required</span>}

           <InputUnregistered
              label="Engine Model"
              placeholder=''
              value={data.engine}
              onChange={(value) => { handleInputChange('engine', value) }} />
        </div>
      </div>

    </div>
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
              options={paidOfOptions}
              value={data.paidOff}
              onChange={(value) => { handleSelectChange('paidOff', value) }} />
            
            {errors.paidOff && <span className='text-sm font-bold text-red-500'>Required</span>}

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

            <h1 className="text-3xl pt-10 pb-10">
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
              value={data.mileage}
              onChange={(value) => { handleInputChange('mileage', value) }} />

            {errors.mileage && <span className='text-sm font-bold text-red-500'>Required</span>}

            <SelectVirtualized
              label='Vehicle Operating Condition?'
              required
              options={vehicleConditionOptions}
              value={data.vehicleCondition}
              onChange={(value) => { handleSelectChange('vehicleCondition', value) }} />
              
            {errors.vehicleCondition && <span className='text-sm font-bold text-red-500'>Required</span>}

             <SelectVirtualized
              label='Are Your Wheels Aluminum Or Steel?'
              required
              options={wheelsOptions}
              value={data.wheels}
              onChange={(value) => { handleSelectChange('wheels', value) }} />
              {errors.wheels && <span className='text-sm font-bold text-red-500'>Required</span>}


            <SelectVirtualized
              label='Does It Have All Wheels?'
              required
              options={
                [
                  { label: 'Yes - Has 4 Wheels.', value: 'Yes - Has 4 Wheels.' },
                  { label: 'No - Missing.', value: 'No - Missing.' },
                  { label: 'Other!', value: 'Other!' }
                ]}
              value={data.allWheels}
              onChange={(value) => { handleSelectChange('allWheels', value) }} />

            {errors.allWheels && <span className='text-sm font-bold text-red-500'>Required</span>}



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
              options={
                [
                  { label: 'Yes', value: 'Yes' },
                  { label: 'No', value: 'No' }
                ]}
              value={data.bodyDamage}
              onChange={(value) => { handleSelectChange('bodyDamage', value) }} />

            {errors.bodyDamage && <span className='text-sm font-bold text-red-500'>Required</span>}

            {data.bodyDamage.value === 'Yes' &&
              <InputText label="Please explain exactly what is damaged."
                value={data.bodyDamageDescription}
                onChange={(value) => { handleInputChange('bodyDamageDescription', value) }} />
            }

           
          </div>
        </div>
      </div>
    )

  }

  // LOCATION STEP
  if (step === STEPS.OWNERSHIP) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

          <SelectVirtualized
              label='Ownership Documents'
              required
              options={ownershipOptiones}
              value={data.ownershipDocument}
              onChange={(value) => { handleSelectChange('ownershipDocument', value) }} />
          {errors.ownershipDocument && <span className='text-sm font-bold text-red-500'>Required</span>}
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
              options={
                [
                  { label: 'Yes', value: 'Yes' },
                  { label: 'No', value: 'No' }
                ]}
              value={data.partMissing}
              onChange={(value) => { handleSelectChange('partMissing', value) }} />

              {errors.partMissing && <span className='text-sm font-bold text-red-500'>Required</span>}


            {data.partMissing.value === 'Yes' &&
              <InputText label="Please explain exactly what is missing or removed."
                value={data.partMissingDescription}
                onChange={(value) => { handleInputChange('partMissingDescription', value) }} />
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
              options={
                [
                  { label: 'Yes', value: 'Yes' },
                  { label: 'No', value: 'No' }
                ]}
              value={data.battery}
              onChange={(value) => { handleSelectChange('battery', value) }} />
                {errors.battery && <span className='text-sm font-bold text-red-500'>Required</span>}

            <SelectVirtualized
              label='Catalytic Converter?'
              required
              options={
                [
                  { label: 'Yes - Original.', value: 'Yes - Original.' },
                  { label: 'Yes - Aftermarket.', value: 'Yes - Aftermarket.' },
                  { label: 'No - Missing.', value: 'No - Missing.' }
                ]}
              value={data.catalytic}
              onChange={(value) => { handleSelectChange('catalytic', value) }} />
                  {errors.catalytic && <span className='text-sm font-bold text-red-500'>Required</span>}

          </div>
        </div>

      </div>
    )
  }

  // IMAGES STEP
  if (step === STEPS.ZIPCODE) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <ZipLookUp
              value={data.zip}
              onChange={handleZipcodeChange}
            />
            {errors.zip && <span className='text-sm font-bold text-red-500'>Required</span>}

            <InputUnregistered
              label="City"
              disabled={isLoading}
              readonly={true}
              value={data.city}
              onChange={() => { }}
            />
            {errors.city && <span className='text-sm font-bold text-red-500'>Required</span>}

            <InputUnregistered
              label="State"
              disabled={isLoading}
              readonly={true}
              value={data.state}
              onChange={() => { }}
            />
            {errors.state && <span className='text-sm font-bold text-red-500'>Required</span>}

          </div>
        </div>
      </div>
    )
  }

  // PHONE STEP
  if (step === STEPS.PHONE) {
    bodyContent = (

      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <InputUnregistered
              label="Name"
              disabled={isLoading}
              required
              value={data.name}
              onChange={(value) => { handleInputChange('name', value) }} />
            
            {errors.name && <span className='text-sm font-bold text-red-500'>Required</span>}


            <InputPhone
              country="US"
              label="Phone"
              disabled={isLoading}
              required
              value={data.phone}
              //disableDropdown={true}
              //dropdownClass='hidden'

              onChange={(value, formattedPhone) => { handleInputChange('phone', value, formattedPhone) }} />
            {errors.phone && <span className='text-sm font-bold text-red-500'>Required</span>}


          </div>
        </div>
      </div>
    )
  }

  // PRICE STEP
  if (step === STEPS.FINISH) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl pt-5 mb-10">
        Are you ready?<br/>
        You are about to send the form!!!
        </h1>
      
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
        //size={step === STEPS.OPERATION ? 'lg' : 'md'}
        disabled={isLoading}
      />
    </div>
  )
}

export default QuoteForm