
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";


interface IParams {
 listingId?:string;
}

export default async function getQuestionsByListingId(
  params: IParams
) {
  try {


  const {listingId} = params;


  let query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }


  const questions = await prisma.askListing.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc'
    },
   });

   if(!questions){
    return null;
   }

   const SafeQuestions = questions.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return SafeQuestions;
   
} catch (error:any) {
  return null;
}
}