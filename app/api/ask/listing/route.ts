import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

export async function POST(
  request:Request
  ) {
    const data = await request.json();
    const {
      userId,
      listingId,
      question,
      ownerId,
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
  
    const askListing = await prisma.askListing.create({
      data:{
        userId,
        ownerId,
        listingId,
        question,
        answer: '',
        status: 0,
      }
    });

    // const notification = await prisma.notification.findMany({
    //   where:{
    //       recipientId:userId,
    //       type:'question'
    //   },
      
    // });

    // return notification;


  
    return NextResponse.json(askListing);
}