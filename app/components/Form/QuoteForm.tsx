'use client';

import { useEffect, useMemo, useState } from "react";
import Heading from '../Heading';

import { useRouter } from "next/navigation";

import InputUnregistered from '../inputs/InputUnregistered';
import CustomSelect from "../inputs/Select";

import useCountries from "@/app/hooks/useCountries";

import InputText from "../inputs/InputText";
import Form from "./Form";
import SelectVirtualized from "../inputs/SelectVirtualized";
import axios from "axios";


enum STEPS {
  DESCRIPTION = 1,
  BRAND = 2,
  CATEGORY = 3,
  ADDRESS = 4,
  LOCATION = 5,
  INFO = 6,
  OPERATION = 7,
  COVER = 8,
  LOGO = 9,
  PHONE = 10,
  FINISH = 11
}

const defaultOption = {label:'',value:''};

const defaultValues = {
  year:defaultOption,
  make:defaultOption,
  model:defaultOption,
  ownershipDocument:defaultOption,
  paidOff:defaultOption,
  vehicleCondition:defaultOption,
  wheels:defaultOption,
  bodyDamage: defaultOption,

};

const ownershipOptiones = [
{label:'I Have A Clean Title.',value:'I Have A Clean Title.'},
{label:'I Have A Salvage Title.',value:'I Have A Salvage Title.'},
{label:'I Only Have The Registration.',value:'I Only Have The Registration.'},
{label:'I Have Lien-Sale Paperwork.',value:'I Have Lien-Sale Paperwork.'},
{label:'I Have A Junk Slip.',value:'I Have A Junk Slip.'},
{label: "I Don't Have Any Papers, But The Vehicle Is Registered In My Name.",value:"I Don't Have Any Papers, But The Vehicle Is Registered In My Name."},
{label:'Other',value:'Other'},
];

const paidOfOptions = [
  {label:'Yes. I own it outright.',value:'Yes'},
  {label:'No. I still owe some money for it.',value:'No'},
];

const vehicleConditionOptions = [
  {label:"Not Running.",value:"Not Running."},
  {label:"Runs and Drives.",value:"Runs and Drives."},
  {label:"Starts Doesn't Drive.",value:"Starts Doesn't Drive."},
  {label:"Vehicle Has Fire Damage.",value:"Vehicle Has Fire Damage."},
  {label:"Vehicle Has Flood Damage.",value:"Vehicle Has Flood Damage."},
  {label:"Runs and Drives, Overheats.",value:"Runs and Drives, Overheats."},
  {label:"Runs and Drives, Not Passing Smog. ",value:"Runs and Drives, Not Passing Smog. "},
  {label:"Runs and Drives, Has Brake Problems.",value:"Runs and Drives, Has Brake Problems."},
  {label:"Runs and Drives, Has Engine Problems.",value:"Runs and Drives, Has Engine Problems."},
  {label:"Runs and Drives, Has Blown Head Gasket.",value:"Runs and Drives, Has Blown Head Gasket."},
  {label:"Runs and Drives, Has Transmission Problems.",value:"Runs and Drives, Has Transmission Problems."},
  {label:"Runs and Drives, Has Bad Battery or Alternator.",value:"Runs and Drives, Has Bad Battery or Alternator."},
];

const wheelsOptions= [
  {label:"Alumium",value:"Alumium"},
  {label:"Not Alumium",value:"Not Alumium"},
]

interface ListingCardProps{
makes:any
}
const QuoteForm: React.FC<ListingCardProps> = ({
makes
}) => {



  const { getStateByValue } = useCountries();
  const [yearList, setYearList] = useState([defaultOption]);
  const [data, setData] = useState(defaultValues);
  const [makeList, setmakeList] = useState(makes);
  const [modelList, setModelList] = useState([defaultOption]);

  const [selectedMake, setSelectedMake] = useState(defaultOption);
  const [selectedModel, setSelectedModel] = useState(defaultOption);

  const handleSelectChange = (field:string, value:any)=>{
      setData({...data, [field]: value});
      if(field == 'make'){
        setSelectedMake(value);
      }

      console.log(data);

      // if(field == 'model'){
      //   setSelectedModel(value);
      // }
      // setData({...data, [field]: value.label});
      // console.log(data);
  }

  const handleInputChange = (field:string, value:any)=>{
   
    setData({...data, [field]: value.label});
  } 

  



  useEffect(() => {
     getModelList();

  }, [selectedMake]);

  const getModelList = async() =>{
    try {
      const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/'+selectedMake.value+'?format=json');
     if(response){
      const modelList =response.data.Results;
      const safeModels = modelList.map((model:any) => ({
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
  
    
    const getYear = () =>  {
      const currentYear = new Date().getFullYear();
      let yearList = [];
      for(let i= currentYear; i>=1930;i--){
        yearList.push({label:i.toString(), value: i.toString()});
      }
      yearList.push({label:'Older', value:'older'});
      setYearList(yearList);
    }


    useEffect(() => {
        getYear();
    }, [])

  const {getStatesOfCountry} = useCountries();


  const router = useRouter();

  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedState, setSelectedState] = useState('');
  const [centerMap, setCenterMap] = useState([]);
  const [zoomMap, setZoomMap] = useState(2);

  const [VIN, setVIN] = useState('');
  const [isVinValid, setisVinValid] = useState(false);
  

  const setValue = (value:string)=>{
    setVIN(value);
    console.log(value);
    if(validateVin(value)){
      setisVinValid(true);
    }else{
      setisVinValid(false);
    }

  }

  function validateVin(vin:string) {
    return validate(vin);
  
  
    // source: https://en.wikipedia.org/wiki/Vehicle_identification_number#Example_Code
    // ---------------------------------------------------------------------------------
    function transliterate(c:string) {
      return '0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ'.indexOf(c) % 10;
    }
  
    function get_check_digit(vin:string) {
      var map = '0123456789X';
      var weights = '8765432X098765432';
      var sum = 0;
      for (var i = 0; i < 17; ++i)
        sum += transliterate(vin[i]) * map.indexOf(weights[i]);
      return map[sum % 11];
    }
  
    function validate(vin:string) {
        if (vin.length !== 17) return false;
        return get_check_digit(vin) === vin[8];
      }
      // ---------------------------------------------------------------------------------
  }



  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit = (data:string) => {
    if (step !== STEPS.FINISH) {
      return onNext();
    }

    alert("Soon");
    // setIsLoading(true);

    // axios.post('/api/listings', data)
    //   .then(() => {
    //     toast.success('Listing Created');
    //     router.refresh();
    //     reset();
    //     setStep(STEPS.DESCRIPTION);

    //   })
    //   .catch(() => {
    //     toast.error('Something went wrong.')
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.FINISH) {
      return 'Send';
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
                onChange={(e) => {setValue(e.target.value) }}
                required
              />
              {isVinValid ?
              <span className='text-sm font-bold text-green-500'>Valid VIN</span>
              :
              <span className='text-sm font-bold text-red-500'>Invalid VIN</span>
               }
            
        </div>
      </div>

    </div>
  )
  
  
  // CATEGORY STEP
  if (step === STEPS.BRAND) {
    
    bodyContent = (
      <div className="flex flex-col gap-8">
  
        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
          <SelectVirtualized
             label='Year'
             required
             options={yearList}
              value={data.year}
             onChange={(value) => {handleSelectChange('year',value) }}
            />
  
            {/* <CustomSelect
              label='Make'
              required
              options={makes}
              onChange={(value) => {handleSelectedMake(value) }} /> */}
            <SelectVirtualized
             label='Make'
             required
             options={makes}
             value={data.make}
             onChange={(value) => {handleSelectChange('make',value) }}
            />
            <SelectVirtualized
             label='Model'
             required
             options={modelList}
             value={data.model}
             onChange={(value) => {handleSelectChange('model',value) }}
            />
  
  
          </div>
        </div>
  
      </div>
    )
    
  }
  // CATEGORY STEP
  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <SelectVirtualized
              label='Ownership Documents'
              required
              options={ownershipOptiones}
              value={data.ownershipDocument}
              onChange={(value) => {handleSelectChange('ownershipDocument',value) }} />

            <SelectVirtualized
              label='Is Your Vehicle Paid Off?'
              required
              options={paidOfOptions}
              value={data.paidOff}
              onChange={(value) => {handleSelectChange('paidOff',value) }} />




          </div>
        </div>

      </div>
    )
  }

  // ADDRESS STEP
  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
          <InputUnregistered
            label="Vehicle Mileage?"
            placeholder='100,000'
            disabled={isLoading}
            required
            onChange={() => { }}
          />
          <hr />
          <SelectVirtualized
              label='Vehicle Operating Condition?'
              required
              options={vehicleConditionOptions}
              value={data.vehicleCondition}
              onChange={(value) => {handleSelectChange('vehicleCondition',value) }} />

        </div>
      </div>
      </div>
    )

  }

  // LOCATION STEP
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">


            <SelectVirtualized
              label='Are Your Wheels Aluminum Or Steel?'
              required
              options={wheelsOptions}
              value={data.wheels}
              onChange={(value) => {handleSelectChange('wheels',value) }} />



          </div>
        </div>
      </div>
    )
  }

  // INFO STEP
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">


            <SelectVirtualized
              label='Is There Any Body Damage?'
              required
              options={
                [
                  {label:'Yes', value:'Yes'},
                  {label:'No',  value:'No'}
                ]}
                value={data.bodyDamage}
                onChange={(value) => {handleSelectChange('bodyDamage',value) }} />

            <hr />
            {data.bodyDamage.value === 'Yes' &&
            <InputText label="Please explain exactly what is damaged." onChange={() => { }} />
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
            <CustomSelect
              label='Any Parts Missing?'
              required
              options={yearList}
              onChange={() => { }} />

            <hr />
            <InputText label="Please explain exactly what is missing or removed." onChange={() => { }} />


          </div>
        </div>
      </div>
    )
  }


  // IMAGES STEP
  if (step === STEPS.COVER) {
    bodyContent = (
      <div className="flex flex-col gap-8">

      <div className="flex flex-col ">
        <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
          <CustomSelect
            label='Does It Have All Wheels?'
            required
            options={yearList}
            onChange={() => { }} />

          <CustomSelect
            label='Does It Have A Battery?'
            required
            options={yearList}
            onChange={() => { }} />

          <CustomSelect
            label='Catalytic Converter?'
            required
            options={yearList}
            onChange={() => { }} />


        </div>
      </div>

    </div>
    )
  }

  // IMAGES STEP
  if (step === STEPS.LOGO) {
    bodyContent = (
      <div className="flex flex-col gap-8">

      <div className="flex flex-col ">
        <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
        <InputUnregistered
            label="City"
            disabled={isLoading}
            required
            onChange={() => { }}
          />
        <CustomSelect
            label='State'
            required
            options={getStatesOfCountry('US')}
            onChange={() => { }} />
        <InputUnregistered
            label="Zip Code"
            disabled={isLoading}
            required
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

      <div className="flex flex-col ">
        <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
        <InputUnregistered
            label="Name"
            disabled={isLoading}
            required
            onChange={() => { }}
          />
         <InputUnregistered
            label="Phone"
            disabled={isLoading}
            required
            onChange={() => { }}
          />
        <InputUnregistered
            label="Zip Code"
            disabled={isLoading}
            required
            onChange={() => { }}
          />

      </div>
      </div>
      </div>
      )
    }

  // PRICE STEP
  if (step === STEPS.FINISH) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Are you ready?"
          subtitle="You are about to send the form!!!"
        />


      </div>
    )

  }

  return (
    <Form
    isOpen={true}
     onSubmit={()=>{onSubmit(VIN)}}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
    body={bodyContent}
    //size={step === STEPS.OPERATION ? 'lg' : 'md'}
    disabled={isLoading}
  />
  )
}

export default QuoteForm