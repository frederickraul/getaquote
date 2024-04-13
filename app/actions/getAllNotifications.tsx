
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";

export default async function getAllNotifications() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

   const notifications = await prisma.notification.findMany({
    where:{
          recipientId: currentUser.id,
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
      sender:true,
    }
  
    
    
   });

  

   if(!notifications){
    return null;
   }

   const SafeNotifications = notifications.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return SafeNotifications;
   
} catch (error:any) {
  return null;
}
}