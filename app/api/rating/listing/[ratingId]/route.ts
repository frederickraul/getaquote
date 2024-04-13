import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  ratingId?: string;
}

// UPDATE METHOD
export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { ratingId } = params;
    const data = await request.json();
    const {
      title,
      body,
      rating,
      userId,
      listingId,
    } = data;

    

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
  


    const ratingListing = await prisma.ratingListing.update({
      where:{
        id:ratingId
      },
      data:{
        title,
        body,
        rating,
        userId,
        listingId,
      }
    });
    return NextResponse.json(ratingListing);
}


export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { ratingId } = params;

  if (!ratingId || typeof ratingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const rating = await prisma.ratingListing.deleteMany({
    where: {
      id: ratingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(rating);
}