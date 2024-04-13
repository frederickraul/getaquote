import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

export async function POST(
  request:Request
  ) {
    const data = await request.json();
    const {
      type,
      recipientId,
      senderId,
      senderName,
      listing,
      product,
      item,
      message,
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
    
    const currentTime = Date.now();
    let content = "";
    let itemId ="";
    let itemName = "";
    let item2Id = "";
    switch(type){
      case "question":
        content="has a question for you";
        itemId = listing.id;
        break;
      case "favoriteListing":
        content="like your listing ";
        itemId = listing?.id;
        itemName = listing?.title;
        break;
      case "favoriteProduct":
        content="like your product ";
        itemId = product?.id;
        itemName = product?.title;
        item2Id = product?.listingId;
        break;
        case "message":
        content=message;
        itemId = item.id;
        const notification = await prisma.notification.findFirst({
          where:{
            recipientId:recipientId,
            senderId: senderId,
            itemId: itemId,
          }
        });

        if(notification){
          const updatedNotification = await prisma.notification.update({
            where:{
              id: notification.id
            },
            data:{
              content:content,
              status:0,
              timestamp: currentTime,
            }
          });
          return NextResponse.json(updatedNotification);
        } 

        
        break;
    }


    const notification = await prisma.notification.create({
      data:{
        type,
        recipientId,
        senderId,
        itemId,
        itemName,
        item2Id,
        status: 0,
        UTC: '',
        content: content, 
        count:1,
        timestamp: currentTime,
      }
    });



  
    return NextResponse.json(notification);
}