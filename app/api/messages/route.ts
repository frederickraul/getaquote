import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
  request:Request
  ) {

    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }


    const data = await request.json();
    const {
      chatId,
      recipientId,
      senderId,
      content,
     
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
    
   
    const currentTime = Date.now();

    const notificationUser = await prisma.message.create({
      data:{
        userId: recipientId,
        senderId: currentUser.id,
        chatId: chatId,
        content,
      }
    });

    const notificationRecipient = await prisma.message.create({
      data:{
        userId: currentUser.id,
        senderId: currentUser.id,
        chatId: chatId,
        content,
      }
    });



  
    return NextResponse.json(notificationUser);
}