
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";

export default async function getQuestionsByOwnerId() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }



   const questions = await prisma.askListing.findMany({
    where:{
      ownerId: currentUser.id,
    },
    orderBy: [
      {
        status: 'asc',
      },
      {
        createdAt: 'desc'
      }
    ],
    include:{
      user: true,
      listing: true,
    }
    
    
   });


   if(!questions){
    return null;
   }

   const SafeQuestions = questions.map((item) => ({
    ...item,
    user: item.user.name,
    listing: item.listing.title,
    createdAt: item.createdAt.toISOString(),
  }));

  return SafeQuestions;
   
} catch (error:any) {
  return null;
}
}