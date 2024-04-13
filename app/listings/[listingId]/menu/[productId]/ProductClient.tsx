'use client';


import { SafeUser } from "@/app/types";

import Container from "@/app/components/Container";

import ListingCardHorizontal from "@/app/components/listings/ListingCardHorizontal";

import { BiArrowBack, BiCheckShield } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdArrowBackIos, MdArrowLeft, MdOutlineReviews } from "react-icons/md";
import { TbArrowLeft } from "react-icons/tb";
import ProductCardHorizontal from "@/app/components/products/ProductCardHorizontal";
import List from "../../List";
import { dataList } from "@/app/const";
import EmptyView from "@/app/components/common/EmptyView";
import Button from "@/app/components/Button";
import Rating from "../../../../components/Rating";
import Reviews from "./Reviews";
import Modal from "@/app/components/modals/Modal";
import ReviewModal from "@/app/components/modals/ReviewModal";
import FloatingButton from "@/app/components/FloatingButton";
import Heading from "@/app/components/Heading";
import EmptySpace from "@/app/components/EmptySpace";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/components/modals/ConfirmModal";
import useConfirmModal from "@/app/hooks/useConfirmModal";
import useOwner from "@/app/hooks/useOwner";



interface ProductClientProps {
  listing?: any;
  product: any;
  chat?:any;
  relatedProducts:any;
  currentUser?: SafeUser | null;
  review?: any;
  ratings?: any;

}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  chat,
  relatedProducts,
  listing,
  currentUser,
  review,
  ratings
}) => {

  useEffect(() => {
    if(ratings.length > 0){
      setReviewList(ratings);
    }
  }, [ratings]);

  const { hasOwner } = useOwner({
    productId:product.id,
    currentUser,
    type:'product'
  });
  

  const [isLoading, setIsLoading] = useState(true);
  const [resultsFound, setResultsFound] = useState(true);
  const [deleteReviewId, setDeleteReviewId] = useState('');
  const [reviewList, setReviewList] = useState(ratings);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [ ratingAvg, setRatingAvg] = useState(0);

  const loginModal = useLoginModal();
  const confirmModal = useConfirmModal();

  const router = useRouter();

  
  const toggleIsLoading = () => {
    setIsLoading(true);
  }

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }

  }, [product]);

  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  }

  function shuffleArray(array: any) {
    let len = array.length,
      currentIndex;


    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
      let randIndex = Math.floor(Math.random() * (currentIndex + 1));
      var temp = array[currentIndex];
      array[currentIndex] = array[randIndex];
      array[randIndex] = temp;
    }

    if (len > 5) {
      const slicedArray = array.slice(0, 5);
      return slicedArray;
    }

    return array;

  }

  const list = shuffleArray(dataList);


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
    
    axios.delete(`/api/rating/product/${deleteReviewId}`)
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
      return loginModal.onOpen();
    }

   // setReviews(reviews => [...reviews, data]);
    setIsLoading(true);
    
    axios.post('/api/rating/product', {
      title:data.title,
      body:data.body,
      rating:data.rating,
      productId: product?.id,
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
    return loginModal.onOpen();
  }

 // setReviews(reviews => [...reviews, data]);
  setIsLoading(true);
  
  axios.post(`/api/rating/product/${data?.id}`, data)
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
              <div className="text-neutral-500">{product.name}</div>
              <div className="flex flex-row cursor-pointer items-center text-sm" onClick={() => {
                setIsLoading(true);
                router.push(`/listings/${listing.id}`)
              }}>
                <MdArrowBackIos /><span className="ml-1">{listing.title}</span>

              </div>
            </div>

            <ProductCardHorizontal
              starValue={ratingAvg}
              data={product}
              chatId={chat.id}
              currentUser={currentUser}
              isOwner={hasOwner}
            />

          </div>
        </div>
      </Container>
      <Container>
        <div
          className='
          pl-5 sm:pl-0
          lg:w-[960px]
          w-full
          m-auto
          mt-16
          mb-10

          '>
          <div className='w-full my-5 flex flex-row items-center justify-between'>
            <div>
              <div className='text-lg font-bold m-0'> Related Products</div>
            </div>

          </div>
          {/* List of products */}
          {relatedProducts.length >= 1 ? 
            <List
              small 
              items={5} 
              isLoading={()=>{toggleIsLoading()}} 
              list={relatedProducts} 
              currentUser={currentUser}
              action={()=>{}}
              isOwner={hasOwner}
              /> : 
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
          mt-5
          md:mt-16
          mb-10

          '>
          <div className='w-full flex flex-row items-center justify-between'>
            <div className='text-lg font-bold uppercase text-neutral-500'> Reviews</div>
            <div className="w-[70px] md:w-[60px] lg:w-[50px]">
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
          <Rating ratings={ratings} getRatingAverage={(value)=>setRatingAvg(value)}/>
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

          <ConfirmModal
                 title='Are you sure you want to delete your review?'
                 body=' ' 
                onSubmit={handleReviewDelete}/>
            
          </div>
        </div>
      </Container>

    </>
  );
}

export default ProductClient;