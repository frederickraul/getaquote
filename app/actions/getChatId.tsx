import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession} from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { Product } from '@prisma/client';
import { SafeProduct } from '../types';

interface IParams {
 product: any;
}

export default async function getChatId(
  params: IParams
) {
try {


  const currentUser = await getCurrentUser();
  const {
   product
  } = params;
  if (!currentUser) {
    return [];
  }


   const chat = await prisma.chat.findFirst({
    where:{
      productId: product.id,
      userId: currentUser.id
    }
   });

   
   if(!chat){
     
    const chat = await prisma.chat.create({
        data:{
          productId: product.id,
          userId: currentUser.id,
          recipientId:product.userId
        }
       });

       return chat;
   }

   return {
    ...chat,
    createdAt: chat.createdAt.toISOString(),
  };
   
} catch (error:any) {
  return null;
}
}