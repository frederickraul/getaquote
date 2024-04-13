
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";

export default async function getChats() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

   const chats = await prisma.chat.findMany({
    where:{
      OR: [
        {
          userId: currentUser.id,
        },
        { recipientId: currentUser.id,}
      ],
    },
    include:{
      recipient: true,
      user:true,
      product:true,
      messages:{
        where:{
          userId: currentUser.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
      }
    }
  
    
    
   });



   const SafeChats = chats.map((item) => ({
    ...item,
    timestamp: item.messages[0]?.createdAt,
    createdAt: item.createdAt.toISOString(),
  }));

  return SafeChats;
   
} catch (error:any) {
  return null;
}
}