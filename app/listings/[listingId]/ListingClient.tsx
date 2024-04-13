'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeProduct, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";

import useCountries from "@/app/hooks/useCountries";
import ListingCardHorizontal from "@/app/components/listings/ListingCardHorizontal";
import Heading from "@/app/components/Heading";
import { BiCheckShield } from "react-icons/bi";
import FilterPanel from "./FilterPanel";
import { dataList } from "@/app/const";
import List from "./List";
import FloatingButton from "@/app/components/FloatingButton";
import { MdFilterList, MdOutlineReviews } from "react-icons/md";
import Reviews from "./menu/[productId]/Reviews";
import ReviewModal from "@/app/components/modals/ReviewModal";
import Rating from "@/app/components/Rating";
import { Product, RatingListing } from "@prisma/client";
import EmptySpace from "@/app/components/EmptySpace";
import { formatDate } from "@/app/const/hours";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import useConfirmModal from "@/app/hooks/useConfirmModal";
import QuestionsModal from "@/app/components/modals/QuestionsModal";
import useOwner from "@/app/hooks/useOwner";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  products:SafeProduct[];
  currentUser?: SafeUser | null;
  review?: any;
  questions?: any;
  ratings?: any;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  products,
  currentUser,
  review,
  questions,
  ratings,
}) => {

  useEffect(() => {
      setReviewList(ratings);
  
  }, [ratings]);

  useEffect(() => {
      setquestionList(questions);
  
  }, [questions]);


  

  const { getStatesOfCountry } = useCountries();
  const [ratingAvg, setRatingAvg] = useState(0);


  const confirmModal = useConfirmModal();
  const states = getStatesOfCountry(listing.locationValue);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState('');
  const [reviewList, setReviewList] = useState(ratings);

  const loginModal = useLoginModal();
  const router = useRouter();

  const { hasOwner } = useOwner({
    listingId:listing.id,
    currentUser
  });


  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  }

  const toggleQuestionModal = () => {
    setIsQuestionModalOpen(!isQuestionModalOpen);
  }

  const handleQuestionSave =  useCallback((data:any) => {
    
    if (!currentUser) {
     setIsQuestionModalOpen(false);
      return loginModal.onOpen();
    }

    setIsLoading(true);
    
   
    axios.post('/api/ask/listing', {
      question:data.question,
      listingId: listing?.id,
      ownerId:listing?.userId,
      userId: currentUser.id
    })
    .then((response) => {
      const savedData = response.data;
      //setIsQuestionModalOpen(false);
      toast.success('Thank you for ask!!!');
      axios.post(`/api/notifications`, {
        type:'question',
        recipientId:listing?.userId,
        senderId:currentUser.id,
        listing: savedData,
      })

      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
},
[
  listing?.id,
  currentUser,
]);

  const handleReviewDeletePress = (id:string) =>{
    confirmModal.onOpen();
    setDeleteReviewId(id);
  }

  const handleReviewDelete = useCallback(() => {

 
    if (!currentUser) {
      return loginModal.onOpen();
    }

   // setReviews(reviews => [...reviews, data]);
    setIsLoading(true);
    
    axios.delete(`/api/rating/listing/${deleteReviewId}`)
    .then(() => {
      setIsReviewModalOpen(false);
      toast.success('Review deleted!!!');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
},
[
deleteReviewId,
currentUser,
]);
  

  const handleReviewSave = useCallback((data:any) => {

    if (!currentUser) {
      setIsReviewModalOpen(false);
      return loginModal.onOpen();
    }

   // setReviews(reviews => [...reviews, data]);
    setIsLoading(true);
    
    axios.post('/api/rating/listing', {
      title:data.title,
      body:data.body,
      rating:data.rating,
      listingId: listing?.id,
      userId: currentUser.id
    })
    .then(() => {
      setIsReviewModalOpen(false);
      toast.success('Thank you for you opinion!!!');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
},
[
  listing?.id,
  currentUser,
]);



const handleReviewUpdate = useCallback((data:any) => {

  
  if (!currentUser) {
    toggleReviewModal();
    return loginModal.onOpen();
  }

 // setReviews(reviews => [...reviews, data]);
  setIsLoading(true);
  
  axios.post(`/api/rating/listing/${data?.id}`, data)
  .then(() => {
    setIsReviewModalOpen(false);
    toast.success('You opinion has been updated!!!');
    router.refresh();
  })
  .catch(() => {
    toast.error('Something went wrong.');
  })
  .finally(() => {
    setIsLoading(false);
  })
},
[
listing?.id,
currentUser,
]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);


  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [questionList, setquestionList] = useState(questions);
  

  const toggleFilterPanel = () => {
    
    setIsFilterPanelVisible(!isFilterPanelVisible);
  }

  const closeFilterPane = () => {
    setIsFilterPanelVisible(false);
  }

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Added to Cart');
        setDateRange(initialDateRange);
        router.push('/cart');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);




  // FILTER
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const cuisinesDefaultState = [
    { id: 1, checked: false, label: 'American' },
    { id: 2, checked: false, label: 'Chinese' },
    { id: 3, checked: false, label: 'Italian' },
  ];

  const [cuisines, setCuisines] = useState(cuisinesDefaultState);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const toggleIsLoading = () => {
    setIsLoading(true);
  }
  const handleSelectCategory = (event:any,value:any) =>{
    if(value == 'all'){
      setSelectedCategory(null); return;
    }
    !value ? null : setSelectedCategory(value);
  }

  const handleSelectRating = (event:any, value:any) =>{
    if(value == 'all'){
      setSelectedRating(null);
      return;
    }
    !value ? null : setSelectedRating(value)};

  const handleChangeChecked = (id:any) => {
    if(id == 'all'){
      setCuisines(cuisinesDefaultState);
      return;
    }
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event:any, value:any) => {
    if(value == 'all'){
      setSelectedPrice([1000, 5000]);
      return;
    }
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => item.rating === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, searchInput, selectedPrice]);


  // ./FILTER
  

  return ( 
    <>
    <Container isLoading={isLoading}>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
          mt-0 sm:mt-5 md:mt-0
        "
      >
        
        <div className="flex flex-col gap-6">

          <div className="flex flex-col md:flex-row text-base sm:text-2xl">
              <div className="text-neutral-500">{listing.category}</div>
              <div className="flex flex-row"> 
                <div className="flex flex-row text-blue-500 font-bold items-center ml-0 sm:ml-3">
                  <BiCheckShield/>
                  <span > Claimed</span>
                </div>
                <div className="capitalize ml-3">
                  Joined {formatDate(listing.createdAt)}
                </div>
              </div>
          </div>

      
          
          <ListingCardHorizontal
          starValue={ratingAvg}
           key={listing.id}
           data={listing}
           actionId={listing.id}
           openQuestions={toggleQuestionModal}
           //onEditAction={editButtonHandler}
           //onAction={onDelete}
           //onActionSecond={openConfirmModal}
           disabled={isLoading}
           actionLabel="Edit"
           actionLabelSecond="Delete listing"
           currentUser={currentUser}
           isOwner={hasOwner}
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
    <Container full>
      <div className="
         border-b-[1px]
         shadow-sm
      ">

        <FilterPanel
            isVisible={isFilterPanelVisible}
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
            closeFilterPane={closeFilterPane}
          />

      </div>
      <div 
      className='
          lg:w-[960px]
          w-full
          m-auto
          mt-5
          mb-10
          '>
            <div className='w-full my-5 flex flex-row items-center justify-between'>
                <div>
                    <div className='text-xs font-sans ml-5 mb-1 text-neutral-500'>{products.length} results found</div>
                    <div className='text-lg font-bold m-0 ml-5'> All Products</div>
                </div>
                <div>
                      <FloatingButton color='bg-black' icon={MdFilterList} small onClick={toggleFilterPanel} label=''/>
                </div>
            </div>
            {products.length >= 1 ? 
                <List 
                currentUser={currentUser}
                  isLoading={()=>{toggleIsLoading()}} 
                  list={products} 
                  action={()=>{}} 
                  isOwner={hasOwner}
                  /> 
              : 
                <div className="h-[20vh] flex flex-col gap-2 justify-center  items-center">
                  <Heading
                    center
                    title={'There are not items for this listing yet'}
                    subtitle={'Wait for it!!!'}
                  />
                </div>
            }
        </div>
    </Container>
    <Container>
        <div
          className='
          pl-5 sm:pl-0
          lg:w-[768px]
          w-full
          m-auto
          mt-16
          mb-10

          '>
          <div className='w-full flex flex-row items-center justify-between'>
            <div className='text-lg font-bold '> Reviews</div>
            <div className={hasOwner ? "hidden" : "w-[70px] md:w-[60px] lg:w-[50px]"}>
              <FloatingButton
                label='Write a review'
                onClick={toggleReviewModal}
                color='bg-cyan-500'
                hoverColor='hover:bg-cyan-400'
                icon={MdOutlineReviews}
                borderless
                styles='border-cyan-500'

              />

            </div>
          </div>
          <Rating 
            ratings={reviewList} getRatingAverage={(value)=>setRatingAvg(value)}/>
          <div id="reviews" className="mb-20">
            {ratings.length >= 1 ?
            <Reviews 
                reviewList={reviewList} 
                onEdit={toggleReviewModal} 
                onDelete={handleReviewDeletePress}
                currentUser={currentUser}
                />
            
            :
            <EmptySpace
                small
                title="No reviews found"
                subtitle="Try out later." 
             />
            }
            
            <ReviewModal
              review = {review}
              isOpen={isReviewModalOpen}
              onClose={toggleReviewModal}
              onSave={handleReviewSave}
              onUpdate={handleReviewUpdate}
              isLoading={isLoading}
              />

              <QuestionsModal
              questions={questionList}
              isOpen={isQuestionModalOpen}
              onSave={handleQuestionSave}
              onClose={toggleQuestionModal}
              isOwner={hasOwner}
              isLoading={isLoading}
              />

            <ConfirmModal
                title="Are you sure you want to delete your review?"
                body=" " 
                onSubmit={handleReviewDelete}/>
            
          </div>
        </div>
      </Container>
   </>
   );
}
 
export default ListingClient;   