'use client';

import { useEffect, useMemo, useState } from "react";
import { categories } from '../navbar/Categories';
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from '../Heading';
import CategoryInput from "../inputs/CategoryInput";
import { FieldError, FieldErrors, FieldValues, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import CountrySelect from "../inputs/CountrySelect";
import InputUnregistered from '../inputs/InputUnregistered';
import { AiOutlineClockCircle } from "react-icons/ai";
import CustomSelect from "../inputs/Select";
import { hours } from "@/app/const/hours";
import InputPhone from "../inputs/InputPhone";
import useCountries from "@/app/hooks/useCountries";
import { week } from "@/app/const/week";
import { Value } from "@prisma/client/runtime/library";


enum STEPS{
  DESCRIPTION = 1,
  CATEGORY = 2,
  ADDRESS = 3,
  LOCATION = 4,
  INFO =5,
  OPERATION =6,
  COVER =7,
  LOGO =8,
  FINISH = 9
}


const defaultLocation = {
  "value": "US",
  "label": "United States",
  "flag": "🇺🇸",
  "latlng": [
      "38.00000000",
      "-97.00000000"
  ]
};

interface ListingModalProps { 
  selectedStep?:number;
  selectedCountry?:string;
  selectedState?:string;
  listing: any;
  product?: any;
  isOpen: boolean;
  onClose:() => void;
  resetStateSelect:()=>void;
  resetCitySelect:()=>void;
  setCustomValue:(id:string,value:any)=>void;
  setCustomPhone:(phone:string,formattedPhone:string)=>void;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
}

const ListingEditModal: React.FC<ListingModalProps> = ({
  selectedStep,
  selectedCountry,
  selectedState,
  resetCitySelect,
  resetStateSelect,
  setCustomValue,
  setCustomPhone,
  isOpen,
  onClose,
  listing,
  product,
  register,
  errors
})=>{
  
  const {
      title, 
      address,
      visibleAddress,
      apartment,
      zipcode,
      location,
      city,
      state,
      category,
      phone,
      website,
      facebook,
      twitter,
      instagram,
      imageSrc,coverSrc,
      horary
    
    } = listing;


  useEffect(() => {
    let value = 1;
    if(selectedStep){
      value = selectedStep;
      setStep(value);
    }
  }, [selectedStep])
  
  const {getStateByValue} = useCountries();

  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const [centerMap, setCenterMap] = useState([]);
  const [zoomMap, setZoomMap] = useState(2);


  
 
  useEffect(() => {
    resetStateSelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);


  useEffect(() => {
    resetCitySelect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    saveCitySelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const Map = useMemo(() => dynamic(() => import('../Map'),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [centerMap]);

  const StateSelect = useMemo(() => dynamic(() => import ("../inputs/StateSelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedCountry]);

  const CitySelect = useMemo(() => dynamic(() => import ("../inputs/CitySelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedState]);



  const saveCitySelected = () =>{
    setZoomMap(8);
    setCenterMap(city?.latlng); 
    setCustomValue('pin', city?.latlng);  
    if(city?.value === undefined){
      setCenterMap(state?.latlng);
      setCustomValue('pin', state?.latlng);
      setZoomMap(4);
    }

    const stateCode = city?.stateCode;
    const newState = getStateByValue(selectedCountry|| '', stateCode);
    if(newState){
      // console.log(newState);
      setCustomValue('state',newState);
    }   
    
  }

  
    //Week Hours
    const setWeekHours = (itemSelected: any) => {
      horary.map((item:any)=>{

          item.open = itemSelected.open;
          item.close = itemSelected.close;
          item.fulltime = itemSelected.fulltime;
          item.closed = itemSelected.closed;
          setCustomValue('horary',[...horary]);
      })
    }


    const urlPatternValidation = (URL:string) => {
      //const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
      const regex = new RegExp('(https?://)');    
      return regex.test(URL);
    };
  
    const changeUrl = (e:any) => {
      let { value } = e.target;
      const isValid = !value || urlPatternValidation(value);
      if(isValid){
      }else{
        value='https://';
      }
      return value;
    };
  

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const actionLabel = useMemo(() => {
    if(step === STEPS.FINISH){
      return 'Create';
    }

    return 'Continue';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.DESCRIPTION){
      return undefined;
    }

    return 'Back';
  }, [step]);



// DESCRIPTION STEP
 let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you like describe your listing?"
        subtitle="Short and sweet works best!"
      />
      <InputUnregistered
        value={title}
        onChange={(e) => {
          setCustomValue('title',e.target.value);
        }}
        label="Business Name"
        disabled={isLoading}
        required
      />
     
    </div>
  )


// CATEGORY STEP
if(step === STEPS.CATEGORY){
   bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Listing Category"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid
          grid-cols-
          md:grid-cols-2
          gap-3
          max-h-[45vh] 2xl:max-h-[50vh]
        ">
        {categories.map((item) =>(
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category)=>{
                setCustomValue('category',category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}

            />
          </div>
        ))}
      </div>

    </div>
  )
}

// ADDRESS STEP
if(step === STEPS.ADDRESS){
  bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Bussiness Address"
        subtitle="show where they can find you!"
      />
      <div 
        className="
          grid
          gap-3 2xl:gap-4
          overflow-y-auto max-h-[45vh] 2xl:max-h-[50vh]
        ">

          <InputUnregistered
            value={address || ''}
            onChange={(e) => {
              setCustomValue('address',e.target.value);
            }}
            label="Address"
            disabled={isLoading}
            required
          />
          <div className="flex flex-row items-start ml-4 pt-0 md:pt-2">
                   <div className="max-w-[50px] flex ">          
                   <InputUnregistered
                          label=""
                          type="checkbox"
                          disabled={isLoading}
                          checked={visibleAddress}
                          onChange={() => {
                            const value = !visibleAddress;
                            setCustomValue('visibleAddress',value);
                          }}
                    />
                    </div>
                  <label className="ml-2 text-xs font-medium text-gray-900 whitespace-wrap"> (Check the box to hide address from the public) Only City, State and Zip Code will be seen by public.</label>
          </div>
          <hr/>
          <InputUnregistered
            label="Apt/Suite/other"
            value={apartment || ''}
            onChange={(e) => {
              setCustomValue('apartment',e.target.value);
            }}
            disabled={isLoading}
            optional
            
          />
          <hr/>
          <InputUnregistered
            label="Zip"
            value={zipcode || ''}
            onChange={(e) => {
              setCustomValue('zipcode',e.target.value);
            }}
            disabled={isLoading}
            required
          />
      </div>
    </div>
  )

}

// LOCATION STEP
  if(step === STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8 ">
          <Heading
            title="Where is your listing located?"     
            subtitle="Help guest find you!"
          />
            <div className="flex flex-col ">
            <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">

              <CountrySelect
                id='location'
                required
                value={location}
                register={register}
                errors={errors}
                onChange={(value)=>{
                  setCustomValue('location',value);
                  
                }}
              />

              <CitySelect
                //stateCode={selectedState}
                countryCode={selectedCountry || ''}
                value={city}
                onChange={(value)=>{setCustomValue('city',value)}}
              />
              <StateSelect
                id='state'
                required
                register={register}
                errors={errors}
                countryCode={selectedCountry || ''}
                value={state}
                onChange={(value)=>{setCustomValue('state',value)}}
              />

              <InputUnregistered
                    label=""
                    type="hidden"
                    disabled={isLoading}
                    onChange={(value)=>{setCustomValue('pin',value)}}
 
                  />
              <Map 
                center={centerMap}
                zoom={zoomMap}
              />
              </div>
            </div>
      </div>
    )
  }

  // INFO STEP
  if(step === STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share contact info"     
            subtitle="What your business contact info?"
          />
          <div 
            className="           
              overflow-y-auto h-[40vh] 2xl:max-h-[50vh]
            ">
              <InputPhone
                country="us"
                //id="phone"
                label="Phone number"
                type="number"
                disabled={isLoading}
                value={phone}
                onChange={(phone,formattedPhone) => {
                  setCustomPhone(phone,formattedPhone);
                }}
                //register={register}
                //errors={errors}
                required
              />
              <br/>
              <hr/>
              <br/>
              <Heading
                title="Social media"     
              />
              <InputUnregistered
                value={website || ''}
                onChange={(e) => {
                 const link = changeUrl(e);
                  setCustomValue('website',link);
                }}
                label="Website Link"
                optional
                disabled={isLoading}
                
              />
              <br/>
              <InputUnregistered
                value={facebook || ''}
                onChange={(e) => {
                  const link = changeUrl(e);
                  setCustomValue('facebook',link);
                }}
                label="Facebook Link"
                optional
                disabled={isLoading}
              />
              <br/>
              <InputUnregistered
                value={twitter || ''}
                onChange={(e) => {
                  const link = changeUrl(e);
                  setCustomValue('twitter',link);
                }}
                label="Twitter Link"
                optional
                disabled={isLoading}
                
              />
              <br/>
              <InputUnregistered
                value={instagram || ''}
                onChange={(e) => {
                  const link = changeUrl(e);
                  setCustomValue('instagram',link);
                }}
                label="Instagram Link"
                optional
                disabled={isLoading}
              />
          </div>
      </div>
    )
  }

  // INFO STEP
  if(step === STEPS.OPERATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading
            title="Share business hours"     
            subtitle="When are you opening?"
          />
         
         <div className="flex flex-col">
         {
           horary.map((item:any,i:number) =>(
            <div key={item.day} className="flex flex-col mb-2">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
              <div className="sm:mr-4 pl-5 sm:pl-0 min-w-[100px] w-[100%] sm:w-auto font-bold text-left">
                  {item.day}
              </div>
              <div className="flex flex-row">
              <div className="w-[150px]">
                <CustomSelect
                    options={hours}
                    value={item.open}
                    onChange={(value) => {
                      item.open = value;
                      setCustomValue('horary',[...horary]);
                    }}
                />
               
              </div>
            <div className="font-bold m-2"> - </div>
            <div className="w-[150px]">
                <CustomSelect
                    options={hours}
                    value={item.close}
                    onChange={(value) => {
                      item.close = value;
                      setCustomValue('horary',[...horary]);
                    }}
                />
            </div>
              </div>
            <div className="flex flex-row sm:flex-col">
                <div className="flex items-center pl-2 ml-4">
                  <InputUnregistered
                        value={item.fulltime}
                        label=""
                        type="checkbox"
                        disabled={isLoading}
                        checked={item.fulltime}
                        onChange={(e) => {
                          item.fulltime = !item.fulltime;
                          setCustomValue('horary',[...horary]);
                        }}
                    />
                        <label className="w-full ml-2 text-sm font-medium text-gray-900 min-w-[100px]"> Open 24 hours</label>

                  </div>
                  <div className="flex items-center pl-2 ml-4">
                  <InputUnregistered
                        checked={item.closed}
                        label=""
                        type="checkbox"
                        disabled={isLoading}
                        onChange={(e) => {
                          item.closed = !item.closed;
                          setCustomValue('horary',[...horary]);
                        }}
                    />
                  <label className="w-full ml-2 text-sm font-medium text-gray-900 min-w-[100px]"> Closed </label>

                </div>
            </div>
          </div>
            {item.day === "Monday" &&(
              <div className="flex flex-row justify-center items-center mb-2 text-green-700 cursor-pointer"
              onClick={()=>{setWeekHours(item);}
            }
            >
              <AiOutlineClockCircle/>
              <div>{  'Use these hours for all week days'}</div>
            </div>
            )}
          <hr/>
            </div>
            ))
          }
          </div>
         </div>
    )
  }


    // IMAGES STEP
    if(step === STEPS.LOGO){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a logo of your listing"
            subtitle="show guest what your logo looks like!"
          />
          <ImageUpload 
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )
    }

    // IMAGES STEP
    if(step === STEPS.COVER){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a logo of your listing"
            subtitle="show guest what your logo looks like!"
          />
          <ImageUpload 
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )
    }

    // PRICE STEP
    if(step === STEPS.FINISH){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Are you ready?"
            subtitle="You are about to create a new listing!!!"
          />
         
         
        </div>
      )
    
    }

  return (
   <Modal
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={onClose}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={undefined }
    title="Update your listing!!!"
    body={bodyContent}
    size={step === STEPS.OPERATION ? 'lg' : 'md'}
    disabled={isLoading}
   />
  )
}

export default ListingEditModal