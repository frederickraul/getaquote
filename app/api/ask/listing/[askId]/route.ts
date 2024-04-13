import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  askId?: string;
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
    const { askId } = params;

    const data = await request.json();
    const {
      question,
      answer,
      userId,
      listingId,
    } = data;

    

    Object.keys(data).forEach((value: any) => {
        if(!data[value]){
          NextResponse.error();
        }
      });
  


    const askListing = await prisma.askListing.update({
      where:{
        id:askId
      },
      data:{
        userId,
        listingId,
        question,
        answer,
        status: 1,
      }
    });
    return NextResponse.json(askListing);
}


export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { askId } = params;

  if (!askId || typeof askId !== 'string') {
    throw new Error('Invalid ID');
  }

  const rating = await prisma.ratingListing.deleteMany({
    where: {
      id: askId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(rating);
}