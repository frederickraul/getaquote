import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession} from 'next-auth/next';
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";


interface IParams {
  productId?:string;
listingId?:string,
}

export default async function getRatingByProductId(
  params: IParams
) {

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

  const {productId} = params;


   const rating = await prisma.ratingProduct.findFirst({
    where:{
      productId: productId,
      userId: currentUser.id
    },
    
   });

   if(!rating){
    return null;
   }

   return {
    ...rating,
    createdAt: rating.createdAt.toISOString(),
    
  };
   
} catch (error:any) {
  return null;
}
}