
import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface IParams {
 chatId?:string;
}
export default async function getChatById(
  params: IParams
) {
try {

  const {chatId} = params;

  const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

   const chat = await prisma.chat.findUnique({
    where:{
      id: chatId as string
    },
    include:{
      product: true,
      recipient: true,
      messages:{
        where:{
          userId: currentUser.id,
        },
        orderBy: {
            createdAt: 'desc',
        }
      }
  }
   });

   if(!chat){
    return null;
   }

   return {
    ...chat,
    createdAt: chat.createdAt.toISOString(),
  };
   
} catch (error:any) {
  return null;
}
}