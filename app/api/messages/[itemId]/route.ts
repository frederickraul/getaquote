import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  itemId?: string;
}

//USED ONLY FOR QUESTION NOTIFICATIONS
export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { itemId } = params;
    
    const oldNotification = await prisma.notification.findFirst({
      where:{
        itemId:itemId
      },
    });
    


      const notificationId = oldNotification?.id;
      const recipientId = oldNotification?.recipientId;
      const senderId = oldNotification?.senderId;

    if(notificationId){
      //Update status current notification to isRead
        const notification = await prisma.notification.update({
          where:{
            id:notificationId
          },
          data:{
            status: 1,
          }
        });


    const currentTime = Date.now();
      //Create a new notification
      const newNotification = await prisma.notification.create({
        data:{
          type:"answer",
          content:"has answered your question",
          recipientId: senderId || "",
          senderId: recipientId || "",
          itemId: itemId,
          itemName:"",
          item2Id:"",
          status: 0,
          UTC: '',
          count:1,
          timestamp: currentTime,
        }
      });

      return NextResponse.json(newNotification);
    }


}

