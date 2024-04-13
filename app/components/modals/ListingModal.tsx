'use client';

import { useEffect, useMemo, useState } from "react";
import { categories } from '../navbar/Categories';
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import Heading from '../Heading';
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { hours, testOptions, years } from "@/app/const/hours";
import InputPhone from "../inputs/InputPhone";
import { log } from "console";
import useCountries from "@/app/hooks/useCountries";
import { week } from "@/app/const/week";
import Dropdown from "../Dropdown";
import InputText from "../inputs/InputText";


enum STEPS {
  DESCRIPTION = 1,
  CATEGORY = 2,
  ADDRESS = 3,
  LOCATION = 4,
  INFO = 5,
  OPERATION = 6,
  COVER = 7,
  LOGO = 8,
  PHONE = 9,
  FINISH = 10
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

const ListingModal = () => {

  const { getStateByValue } = useCountries();

  const {getStatesOfCountry} = useCountries();


  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.DESCRIPTION);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedState, setSelectedState] = useState('');
  const [centerMap, setCenterMap] = useState([]);
  const [zoomMap, setZoomMap] = useState(2);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      address: '',
      visibleAddress: false,
      apartment: '',
      zipcode: '',
      location: defaultLocation,
      state: null,
      city: null,
      pin: null,
      phone: '',
      formattedPhone: '',
      XYZ: "xyz",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      coverSrc: '',
      price: 1,
      title: '',
      description: '',
      website: '',
      horary: week,
    }
  });

  const category = watch('category');
  const location = watch('location');
  const state = watch('state');
  const city = watch('city');
  const pin = watch('pin');
  const visibleAddress = watch('visibleAddress');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const coverSrc = watch('coverSrc');
  const horary = watch('horary');
  const phone = watch('phone');
  const formattedPhone = watch('formattedPhone');
  const website = watch('website');
  const zipcode = watch('zipcode');


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

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [centerMap]);

  const StateSelect = useMemo(() => dynamic(() => import("../inputs/StateSelect"), {
    ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedCountry]);

  const CitySelect = useMemo(() => dynamic(() => import("../inputs/CitySelect"), {
    ssr: false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [selectedState]);


  const resetStateSelect = () => {
    if (selectedCountry === location?.value) {
      // console.log("Wait a second");
      return;
    }
    setCustomValue('state', null);
    setCustomValue('city', null);
    setCustomValue('pin', location?.latlng);
    setSelectedCountry(location?.value);
    setCenterMap(location?.latlng);
    setZoomMap(4);
  }

  const resetCitySelect = () => {
    if (selectedState === state?.value) {
      // console.log("Wait a second");
      return;
    }
    if (state?.value == city?.stateCode) {
      return;
    }

    setCustomValue('city', null);
    setCustomValue('pin', state?.latlng);
    setSelectedState(state?.value);
    setCenterMap(state?.latlng);
    setZoomMap(5);

    if (state?.value === undefined) {
      setCenterMap(location?.latlng);
      setCustomValue('pin', location?.latlng);
      setZoomMap(4);
    }
  }

  const saveCitySelected = () => {
    setZoomMap(8);
    setCenterMap(city?.latlng);
    setCustomValue('pin', city?.latlng);
    if (city?.value === undefined) {
      setCenterMap(state?.latlng);
      setCustomValue('pin', state?.latlng);
      setZoomMap(4);
    }

    const stateCode = city?.stateCode;
    const newState = getStateByValue(selectedCountry, stateCode);
    if (newState) {
      // console.log(newState);
      setCustomValue('state', newState);
    }

  }



  //For Regular Inputs
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  //Week Hours
  const setWeekHours = (itemSelected: any) => {
    horary.map((item: any) => {
      item.open = itemSelected.open;
      item.close = itemSelected.close;
      item.fulltime = itemSelected.fulltime;
      item.closed = itemSelected.closed;
      setValue('horary', [...horary]);
    })
  }

  //Weekend
  const setAllDaysHours = (itemSelected: any) => {
    horary.map((item: any) => {
      item.open = itemSelected.open;
      item.close = itemSelected.close;
      item.fulltime = itemSelected.fulltime;
      item.closed = itemSelected.closed;
      setValue('horary', [...horary]);
    })
  }


  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }


  const onSubmit: SubmitHandler<FieldValues> = (data) => {

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
    //     rentModal.onClose();
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
          <CustomSelect
            label='Year'
            required
            options={years}
            onChange={() => { }} />

          <CustomSelect
            label='Make'
            required
            options={testOptions}
            onChange={() => { }} />

          <CustomSelect
            label='Model'
            required
            options={testOptions}
            onChange={() => { }} />


        </div>
      </div>

    </div>
  )


  // CATEGORY STEP
  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div className="flex flex-col ">
          <div className="flex flex-col gap-3 2xl:gap-4 pr-5 3xl:pr-0">
            <CustomSelect
              label='Ownership Documents'
              required
              options={testOptions}
              onChange={() => { }} />

            <CustomSelect
              label='Is Your Vehicle Paid Off?'
              required
              options={testOptions}
              onChange={() => { }} />




          </div>
        </div>

      </div>
    )
  }

  // ADDRESS STEP
  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">

        <div
          className="
          grid
          gap-3 2xl:gap-4
          overflow-y-auto max-h-[45vh] 2xl:max-h-[50vh]
        ">
          <InputUnregistered
            label="Vehicle Mileage?"
            disabled={isLoading}
            required
            onChange={() => { }}
          />
          <hr />
          <InputUnregistered
            label="Vehicle Operating Condition?"
            disabled={isLoading}
            required
            onChange={() => { }}
          />

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


            <CustomSelect
              label='Are Your Wheels Aluminum Or Steel?'
              required
              options={testOptions}
              onChange={() => { }} />



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


            <CustomSelect
              label='Is There Any Body Damage? 
         '
              required
              options={testOptions}
              onChange={() => { }} />

            <hr />
            <InputText label="Please explain exactly what is damaged." onChange={() => { }} />


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
              options={testOptions}
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
            options={testOptions}
            onChange={() => { }} />

          <CustomSelect
            label='Does It Have A Battery?'
            required
            options={testOptions}
            onChange={() => { }} />

          <CustomSelect
            label='Catalytic Converter?'
            required
            options={testOptions}
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
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
      title="Get A Quote"
      body={bodyContent}
      //size={step === STEPS.OPERATION ? 'lg' : 'md'}
      disabled={isLoading}
    />
  )
}

export default ListingModal