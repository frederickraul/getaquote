import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession} from 'next-auth/next';
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";


interface IParams {
 listingId?:string;
}

export default async function getRatingByListingId(
  params: IParams
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

  const {listingId} = params;


   const rating = await prisma.ratingListing.findFirst({
    where:{
      listingId: listingId,
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