'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeListing, SafeProduct, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";

import { BiCheckShield, BiPlus } from "react-icons/bi";
import ListingCardHorizontal from "@/app/components/listings/ListingCardHorizontal";
import List from "@/app/listings/[listingId]/List";
import EmptyView from "@/app/components/common/EmptyView";
import { dataList, defaultImage, editMode } from "@/app/const";
import EditButton from "@/app/components/EditButton";
import ProductModal from "@/app/components/modals/ProductModal";
import ListingModal from "@/app/components/modals/ListingModal";
import ListingEditModal from "@/app/components/modals/ListingEditModal";
import Alert from "@/app/components/Alert";
import useConfirmModal from "@/app/hooks/useConfirmModal";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import { AiOutlineMinus, AiOutlineRight } from "react-icons/ai";



interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  products: SafeProduct[];
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  products,
  currentUser
}) => {

  const { getByValue, getStateByValue, getCityByValue } = useCountries();

  const currentCountryCode = listing.locationValue;
  const currentStateCode = listing.stateCode ? listing.stateCode : '';
  const currentCityName = listing.city ? listing.city : '';

  //console.log(getCityByValue(currentCountryCode, currentStateCode,currentCityName));

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
      category: listing.category,
      address: listing.address,
      visibleAddress: listing.visibleAddress,
      apartment: listing.apartment,
      zipcode: listing.zipcode,
      location: getByValue(listing.locationValue),
      state: getStateByValue(currentCountryCode, currentStateCode),
      city: getCityByValue(currentCountryCode, currentStateCode, currentCityName),
      pin: listing.pin,
      phone: listing.phone,
      formattedPhone: listing.formattedPhone,
      XYZ: "xyz",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: listing.imageSrc,
      coverSrc: listing.coverSrc,
      price: 1,
      title: listing.title,
      description: listing.description,
      horary: listing.horary,
      website: listing.website ,
      facebook: listing.facebook,
      instagram: listing.instagram,
      twitter: listing.twitter,
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
  const website = watch('website');
  const twitter = watch('twitter');
  const facebook = watch('facebook');
  const instagram = watch('instagram');


  const router = useRouter();
  const confirmModal = useConfirmModal();

  const [deleteProductId, setDeleteProductId] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(location?.value);
  const [selectedState, setSelectedState] = useState(state?.value);
  const [isNewChange, setIsNewChange] = useState(false);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsNewChange(false);
    setIsLoading(true);

    axios.post(`/api/listings/${listing.id}`, data)
      .then(() => {
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


  const resetStateSelect = () => {
    if (selectedCountry === location?.value) {
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
    if (selectedState === state?.value) {
      // console.log("Wait a second");
      return;
    }
    if (state?.value == city?.stateCode) {
      return;
    }

    // console.log(selectedState);
    //  console.log(state?.value);
    //  console.log(city?.stateCode);
    // console.log("----->>>>>>");

    setCustomValue('pin', state?.latlng);
    setCustomValue('city', null);
    setSelectedState(state?.value);

    if (state?.value === undefined) {
      setCustomValue('pin', location?.latlng);
    }
  }

  const saveCitySelected = () => {

    setCustomValue('pin', city?.latlng);
    if (city?.value === undefined) {
      setCustomValue('pin', state?.latlng);
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
    if (isListingModalOpen) {
      setIsNewChange(true);
    }
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  //For Regular Inputs
  const setCustomPhone = (phone: string, formattedPhone: string) => {
    setValue('phone', phone, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('formattedPhone', formattedPhone, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }


  const [selectedProduct, setSelectedProduct] = useState('');
  const [resultsFound, setResultsFound] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  const toggleIsLoading = () => {
    setIsLoading(true);
  }

  const setModalOpen = () => { setSelectedProduct(''); setIsModalOpen(true) }
  const setModalClose = () => { setIsModalOpen(false) }
  const setListingModalOpen = () => { setIsListingModalOpen(true) }
  const setListingModalClose = () => { setIsListingModalOpen(false) }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formatDate = (value: any) => {
    var dt = new Date(value);
    const joined = (monthNames[dt.getMonth()]) + " " + dt.getFullYear();

    return joined;
  }

  // OPEN EDIT PRODUCT FORM
  const handleSelectedProduct = (item: any) => {
    setModalOpen();
    setSelectedProduct(item);
  }

  // OPEN EDIT MODEL FORM ON SELECTED STEP
  const HandleEditListing = (step: string) => {
    setStep(Number(step));
    setListingModalOpen();
  }


  //OPEN CONFIRM DIALOG ON PRESS DELETE PRODUCT BUTTON
  const openConfirmModal = (id: string) => {
    confirmModal.onOpen();
    setDeleteProductId(id);
  }

  //DELETE PRODUCT
  const onProductDelete = useCallback(() => {
    setIsLoading(true);
    axios.delete(`/api/products/${deleteProductId}`)
      .then(() => {
        toast.success('Product deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeleteProductId('');
        setIsLoading(false);
      })
  }, [router, deleteProductId]);

  return (
    <Container full>
      <Container isLoading={isLoading}>
        <div
          className="
          bg-white
          max-w-screen-lg 
          mx-auto
          mt-0 sm:mt-5 md:mt-0
        "
        >

          <div className="flex flex-col gap-6">
            <div className="flex flex-row text-blue-500 font-bold items-center text-2xl">
                <a className="cursor-pointer" onClick={()=>{router.push('/mylistings')}}> My Listings </a>  
                <span className="text-neutral-400 ml-2 flex flex-row">  
                    <div className="ml-2 mr-2 flex flex-row items-center">
                        <AiOutlineMinus /> 
                        <AiOutlineRight className="-ml-2"/>
                    </div>
                    Edit Section
                </span>
            </div>
            {isNewChange && <Alert action={handleSubmit(onSubmit)} />}
            <div className="flex flex-col md:flex-row text-base sm:text-2xl">
              <div className="text-neutral-500 relative pr-8 mr-5">{category}
                <EditButton action={() => { HandleEditListing('2') }} />

              </div>
              <div className="flex flex-row">
                <div className="flex flex-row text-blue-500 font-bold items-center ml-0 sm:ml-3">
                  <BiCheckShield />
                  <span > Claimed</span>
                </div>
                <div className="capitalize ml-3">
                  Joined {formatDate(listing.createdAt)}
                </div>
              </div>
            </div>



            <ListingCardHorizontal
              key={listing.id}
              actionId={listing.id}
              //onEditAction={HandleEditListing}
              //onAction={onDelete}
              //onActionSecond={HandleEditListing}
              onEditButton={HandleEditListing}
              disabled={isLoading}
              actionLabel="Edit"
              actionLabelSecond="Delete listing"
              currentUser={currentUser}
              edit
              data={{
                title,
                address,
                visibleAddress,
                imageSrc,
                coverSrc,
                location,
                zipcode,
                city: city?.label,
                state: state?.label,
                formattedPhone,
                category,
                horary,
                website,
                facebook,
                twitter,
                instagram
              }}
            />


            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
              mb-0
            "
            >


            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div
          className='
          lg:w-[960px]
          w-full
          m-auto
          pt-5
          mb-10
          bg-white
          pb-10
          '>
          <div className='w-full my-5 flex flex-row items-center justify-between'>
            <div className="relative">
              <div className='text-xs font-sans ml-5 mb-1 text-neutral-500'>{products.length} results found</div>
              <div className='text-lg font-bold m-0 ml-5'> All Products</div>
            </div>

          </div>
          {resultsFound ?
            <div>

              <List
                isLoading={() => { toggleIsLoading() }}
                list={products}
                edit
                action={setModalOpen}
                secondAction={handleSelectedProduct}
                openConfirmModal={openConfirmModal}
              />

              <ConfirmModal
                onSubmit={onProductDelete}
                title='Are you sure you want to delete your product?'
                body=' '
              />

            </div>

            :
            <EmptyView />
          }
        </div>
        <ProductModal
          product={selectedProduct}
          listingId={listing.id}
          isOpen={isModalOpen}
          onClose={setModalClose}
          onSave={() => alert('Saving')} />
      </Container>

      <ListingEditModal
        setCustomValue={setCustomValue}
        setCustomPhone={setCustomPhone}
        selectedStep={step}
        isOpen={isListingModalOpen}
        onClose={setListingModalClose}
        selectedCountry={selectedCountry}
        selectedState={selectedState}
        resetCitySelect={resetCitySelect}
        resetStateSelect={resetStateSelect}
        register={register}
        errors={errors}
        listing={{
          title,
          address,
          visibleAddress,
          apartment,
          zipcode,
          category,
          location,
          state,
          city,
          pin,
          horary,
          coverSrc,
          imageSrc,
          phone,
          formattedPhone,
          website,
          facebook,
          twitter,
          instagram

        }}
      />
    </Container>
  );
}

export default ListingClient;