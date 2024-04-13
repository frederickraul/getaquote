import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

export async function POST(
  request:Request
  ) {
    const data = await request.json();
    const {
      title,
      body,
      rating,
      userId,
      productId,
    } = data;

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
  


    const ratingListing = await prisma.ratingProduct.create({
      data:{
        title,
        body,
        rating,
        userId,
        productId,
      }
    });
    return NextResponse.json(ratingListing);
}