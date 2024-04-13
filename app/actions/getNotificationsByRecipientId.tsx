
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "./getCurrentUser";

export default async function getNotificationsByRecipientId() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }



   const notifications = await prisma.notification.findMany({
    where:{
      AND:[
        {
          recipientId: currentUser.id,
        },{
          status: 0,
        }
      ]
    },
    orderBy: [
      {
        status: 'asc',
      },
      {
        timestamp: 'desc'
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