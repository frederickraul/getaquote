'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import InputUnregistered from "@/app/components/inputs/InputUnregistered";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import PreviewListingCard from "@/app/components/listings/PreviewListingCard";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomSelect from "@/app/components/inputs/Select";
import InputPhone from "@/app/components/inputs/InputPhone";
import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Modal from "@/app/components/modals/Modal";
import { AiFillPicture, AiOutlineClockCircle } from "react-icons/ai";
import { MdMonochromePhotos } from "react-icons/md";
import { formatTime, hours } from "@/app/const/hours";
import CountrySelect from "@/app/components/inputs/CountrySelect";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}




const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {

  const {getByValue,getStateByValue, getCityByValue} = useCountries();

    
  const currentCountryCode = listing.locationValue;
  const currentStateCode = listing.stateCode ? listing.stateCode : '';
  const currentCityName = listing.city ? listing.city : '';

  //console.log(getCityByValue(currentCountryCode, currentStateCode,currentCityName));
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      category: listing.category,
      address: listing.address,
      visibleAddress: listing.visibleAddress,
      apartment: listing.apartment,
      zipcode: listing.zipcode,
      location: getByValue(listing.locationValue),
      state: getStateByValue(currentCountryCode, currentStateCode),
      city: getCityByValue(currentCountryCode, currentStateCode,currentCityName),
      pin: listing.pin,
      phone: listing.phone,
      formattedPhone: listing.formattedPhone,
      XYZ: "xyz",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: listing.imageSrc,
      coverSrc:listing.coverSrc,
      price: 1,
      title: listing.title,
      description: listing.description,
      horary: listing.horary,
      website: listing.website,
    }
  });


  const category = watch('category');
  const pin = watch('pin');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const title = watch('title');
  const imageSrc = watch('imageSrc');
  const coverSrc = watch('coverSrc');
  const horary = watch('horary');
  const apartment = watch('apartment');
  const address = watch('address');
  const visibleAddress = watch('visibleAddress');
  const location = watch('location');
  const country = watch('country');
  const state = watch('state');
  const city = watch('city');
  const zipcode = watch('zipcode');
  const phone = watch('phone');
  const formattedPhone = watch('formattedPhone');

 
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(location?.value);
  const [selectedState, setSelectedState] = useState(state?.value);
  const [step, setStep] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    axios.post(`/api/listings/${listing.id}`, data)
    .then(()=>{
      toast.success('Listing Updated');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false);
    }); 
  }
  
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


  const StateSelect = useMemo(() => dynamic(() => import ("@/app/components/inputs/StateSelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedCountry]);

  const CitySelect = useMemo(() => dynamic(() => import ("@/app/components/inputs/CitySelect"),{
    ssr:false
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedState]);


  const resetStateSelect = () => {
    if(selectedCountry === location?.value){
      // console.log("Wait a second");
      return;
    }
    // console.log(selectedCountry);
    // console.log(location?.value);
    
    setCustomValue('pin', location?.latlng);
    setSelectedCountry(location?.value);
    setCustomValue('state', null);
    setCustomValue('city', null);
    setCustomValue('pin', location?.latlng);
    
  }
  
  const resetCitySelect = () => {
    if(selectedState === state?.value){
      // console.log("Wait a second");
      return;
    }
    if(state?.value == city?.stateCode){
      return;
    }
    
    // console.log(selectedState);
    //  console.log(state?.value);
    //  console.log(city?.stateCode);
    // console.log("----->>>>>>");
    
    setCustomValue('pin', state?.latlng);
    setCustomValue('city', null);
    setSelectedState(state?.value);

      if(state?.value === undefined){
        setCustomValue('pin', location?.latlng);
      }
  }

  const saveCitySelected = () =>{
    
    setCustomValue('pin', city?.latlng);  
    if(city?.value === undefined){
      setCustomValue('pin', state?.latlng);
    }

    const stateCode = city?.stateCode;
    const newState = getStateByValue(selectedCountry, stateCode);
    if(newState){
      // console.log(newState);
      setCustomValue('state',newState);
    }    
  }
  //For Regular Inputs
  const setCustomValue = (id: string, value:any) => {    
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

    //Week Hours
    const setWeekHours = (itemSelected: any) => {
      horary.map((item:any)=>{

          item.open = itemSelected.open;
          item.close = itemSelected.close;
          item.fulltime = itemSelected.fulltime;
          item.closed = itemSelected.closed;
          setValue('horary',[...horary]);
      })
    }
  
  
  const setModalOpen = () =>{setIsModalOpen(true)}
  const setModalClose = () =>{setIsModalOpen(false)}

// LOGO COVER OPERATION
    let bodyContent = (
      <>
      
      </>
    );

    if(step === "logo"){
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
    if(step === 'cover'){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a cover of your listing"
            subtitle="show guest what your cover looks like!"
          />
          <ImageUpload 
            value={coverSrc}
            onChange={(value) => setCustomValue('coverSrc', value)}
          />
        </div>
      )
    }

      // INFO STEP
  if(step === "operation"){
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
                    disabled={item.fulltime || item.closed}
                    onChange={(value) => {
                      item.open = value;
                      setValue('horary',[...horary]);
                    }}
                />
               
              </div>
            <div className="font-bold m-2"> - </div>
            <div className="w-[150px]">
                <CustomSelect
                    options={hours}
                    value={item.close}
                    disabled={item.fulltime || item.closed}
                    onChange={(value) => {
                      item.close = value;
                      setValue('horary',[...horary]);
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
                          if(item.fulltime){
                            item.closed = false;
                            }
                          setValue('horary',[...horary]);
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
                          if(item.closed){
                          item.fulltime = false;
                          }
                          setValue('horary',[...horary]);
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
// ./LOGO COVER OPERATION


  return ( 
    <Container isLoading={isLoading}>
      <div>
          <div 
            className="flex flex-row mb-20"
          >
            <div className="w-[100%] md:w-[80%] 2xl:w-[70%]">
              <div className="mt-0 sm:mt-5 md:mt-0 mb-10">
              <Heading
                    title={listing.title}
                    subtitle="UPDATE"
                  />
              </div>
                <div className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 mb-2">
                      Business Name
                    </label>
                    <Input
                        id="title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                      />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 mb-2">
                      Listing Category
                    </label>
                      <CustomSelect
                        options={categories}
                        value={category}
                        onChange={(value) => {
                          setValue('category',value);
                        }}
                    />
                  </div>
                </div>
                <hr/>
                <div className="flex font-bold mt-2 mb-1">
                Where is your company located?
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs mb-2">
                      Country
                    </label>
                    <CountrySelect
                      id='location'
                      register={register}
                      errors={errors}
                      required
                      value={location}
                      onChange={(value)=>{
                        setCustomValue('location',value); 
                      }}
                    />

                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label className="text-xs block tracking-wide text-gray-700 mb-2">
                      Address
                    </label>
                    <Input
                        id="address"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                      />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="text-xs block tracking-wide text-gray-700 mb-2">
                      Apt/Suite/Other <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                    <Input
                        id="apartment"
                        placeholder="Ste 5"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-start ml-4 pt-0 md:pt-2">
                   <div className="max-w-[50px] flex ">
                   <InputUnregistered
                          label=""
                          type="checkbox"
                          disabled={isLoading}
                          checked={visibleAddress}
                          onChange={() => {
                            const value = !visibleAddress;
                            setValue('visibleAddress',value);
                          }}
                    />
                   </div>
                  <label className="ml-2 text-xs font-medium text-gray-900 whitespace-wrap"> (Check the box to hide address from the public) Only City, State and Zip Code will be seen by public.</label>

                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs mb-2">
                      City
                    </label>
                    <CitySelect
                      //stateCode={selectedState}
                      countryCode={selectedCountry}
                      value={city}
                      onChange={(value)=>{setCustomValue('city',value)}}
                    /> 

                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs  mb-2" >
                      State
                    </label>
                    <div className="relative">
                    <StateSelect
                      id='state'
                      register={register}
                      errors={errors}
                      required
                      value={state}
                      countryCode={location.value}
                      onChange={(value)=>{setCustomValue('state',value)}}
                    />

                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs  mb-2">
                      Zip
                    </label>
                    <Input
                        id="zipcode"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                      />
                  </div>
                </div>
                <hr/>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                      <label className="block tracking-wide text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {/* <Input
                        id="phone"
                        label=""
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                      /> */}
                      <InputPhone
                        label=""
                        country='us'
                        value={phone}
                        onChange={(phone,formattedPhone) => {
                          setValue('phone',phone);
                          setValue('formattedPhone',formattedPhone);
                        }}
                        
                      />
                    </div>
                </div>
                <hr/>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2 justify-between">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                      <label className="block tracking-wide text-gray-700 mb-2">
                        Hours of Operation
                      </label>
                      <div className="">
                        {
                        horary.map((item:any,i:number) =>(
                          <div key={item.day} className="flex flex-col whitespace-nowrap">
                              <div className="flex flex-row items-center justify-between">
                                <div className="sm:mr-4 pl-5 sm:pl-0 min-w-[100px] w-[100%] sm:w-auto text-xs">
                                    {item.day}
                                </div>
                              {item.fulltime &&
                                  <div className='font-bold text-green-700 flex flex-row items-center '>
                                    <AiOutlineClockCircle size={12}/> <span className='ml-1 text-sm'>Open 24 Hours</span>
                                  </div>
                              }
                              {item.closed &&
                                  <div className='font-bold text-red-700 flex flex-row items-center '>
                                    <AiOutlineClockCircle size={12}/> <span className='ml-1 text-sm'>Closed</span>
                                  </div>
                              }
                              {!item.closed && !item.fulltime &&
                                <div className="flex flex-row items-center whitespace-nowrap">
                                    <div className="max-w-[220px] text-xs">
                                    {formatTime(item.open)}
                                    </div>
                                    <div className="ml-2 mr-2"> - </div>
                                    <div className="max-w-[220px] text-xs">
                                      {formatTime(item.close)}
                                    </div>
                                </div>
                              }  
                            </div>
                          </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 md:pt-10 items-center flex flex-wrap justify-end">
                       <div className="w-1/2 md:w-full">
                        <Button
                            styles='border-blue-500 text-blue-500'
                            outline
                            label="Edit"
                            onClick={()=>{
                              setStep('operation');
                              setModalOpen();
                            }}
                            small
                          />
                       </div>
                    </div>
                </div>
                <hr/>
                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                      <label className="block tracking-wide text-gray-700 mb-2">
                        Website Link <span className="text-xs text-neutral-400">(Optional)</span>
                      </label>
                      <Input
                        id="website"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                      />
                    </div>
                </div>
                <hr/>

                <div className="flex flex-wrap -mx-3 mb-6 mt-2">
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block tracking-wide text-gray-700 mb-2 text">
                       Logo
                      </label>
                      <Button
                        icon={MdMonochromePhotos}
                        label='Update Logo'
                        color='bg-black'
                        styles='border-white text-xs md:text-base'
                        borderless
                        roundless
                        onClick={()=>{
                          setStep('logo');
                          setModalOpen();
                        }}
                        />                    
                      </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block tracking-wide text-gray-700 mb-2">
                       Cover Photo
                      </label>
                        <Button
                          icon={MdMonochromePhotos}
                          label='Update Cover'
                          color='bg-black'
                          styles='border-white text-xs md:text-base'
                          borderless
                          roundless
                          onClick={()=>{
                            setStep('cover');
                            setModalOpen();
                          }}
                          />      
                    </div>
                </div>
                <hr/>

                <div className="flex flex-wrap -mx-3 mb-6 mt-2 justify-center">
                  <div className="w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <Button
                            styles='text-white'
                            label="CANCEL"
                            disabled={isLoading}
                            onClick={()=>{router.push('/mylistings')}} 
                            />
                    </div>
                  <div className="w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <Button
                            styles='text-white border-blue-500'
                            color="bg-blue-500"
                            borderless
                            label="UPDATE"
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit) }
                      />
                    </div>
                </div>
                
              </div>

              <Modal
                isOpen={isModalOpen}
                onClose={setModalClose}
                onSubmit={setModalClose}
                actionLabel={"Continue"}
                secondaryActionLabel={undefined}
                secondaryAction={setModalClose}
                title="Update"
                body={bodyContent}
                size={step === 'operation' ? 'lg' : 'md'}
                disabled={isLoading}
              />

            </div>
            {/* PREVIEW LISTING */}
            <div className="hidden md:flex w-[20%] 2xl:w-[30%] ml-10 2xl:ml-20 overflow-y-auto">
              <div className='text-start overflow-y-auto h-[90vh]  w-full'>
                  <div className="font-bold text-neutral-500">
                      Business Preview
                  </div>
                  <div className="font-bold text-lg mt-2">
                      {listing.category}
                  </div>
                  <PreviewListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={{
                        id: listing.id,
                        imageSrc: imageSrc,
                        title: title,
                        apartment: apartment,
                        address: address,
                        country: location?.value,
                        state: state?.label,
                        city: city?.label,
                        zipcode: zipcode,
                        formattedPhone: formattedPhone,
                        category:category,
                        visibleAddress: visibleAddress,
                      }}
                  />
            
                </div>
            </div>
            {/* ./PREVIEW LISTING */}
          </div> 
        </div>
    </Container>
   );
}
 
export default ListingClient;