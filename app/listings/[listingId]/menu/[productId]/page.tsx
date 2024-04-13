import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptySpace from '@/app/components/EmptySpace';
import { dataList } from '@/app/const';
import { useParams } from 'next/navigation'
import React from 'react'
import ProductClient from './ProductClient';
import getListingById from '@/app/actions/getListingById';
import getProductById from '@/app/actions/getProductById';
import getProducts from '@/app/actions/getProducts';
import getRatingByProductId from '@/app/actions/getRatingByProductId';
import getRatingsByProductId from '@/app/actions/getRatingsByProductId';
import getChatId from '@/app/actions/getChatId';


interface IParams{
  listingId: string;
  productId: string;
}

const ProductPage = async ({params}:{params: IParams}) => {
  const {productId} = params;
  const listing = await getListingById(params);
  const product = await getProductById(params);
  const relatedProducts = await getProducts(params);
  const currentUser = await getCurrentUser();
  const review = await getRatingByProductId(params);
  const ratings = await getRatingsByProductId(params);
  const chat = await getChatId({product});
  

  console.log("ChatId: ");
  console.log(chat);

  //const params = useParams()
  //const listing = await getListingById(params);

  if(!product){
    return (
      <EmptySpace/>
    )
  }
  return (
    <div>
      <ProductClient
          listing={listing}
          product={product}
          chat={chat}
          relatedProducts={relatedProducts}
          currentUser={currentUser}
          review={ review }
          ratings={ ratings }
        />
    </div>
  )
 
}

export default ProductPage