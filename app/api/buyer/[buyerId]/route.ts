import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';


interface IParams {
  buyerId?: string;
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
    const { buyerId } = params;

  const body = await request.json();
  const {
    email,
    name,
    phone
  } = body;


  Object.keys(body).forEach((value: any) => {
    if(!body[value]){
      NextResponse.error();
    }
  });

 

  const buyer = await prisma.buyer.update({
    where:{
      id:buyerId,
    },
    data: {
    email,
    name,
    phone
    }
  })
  return NextResponse.json(buyer);
}


export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    // const currentUser = await getCurrentUser();
  
    // if (!currentUser) {
    //   return NextResponse.error();
    // }
  
    const { buyerId } = params;
  
    if (!buyerId || typeof buyerId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const buyer = await prisma?.buyer.deleteMany({
      where: {
        id: buyerId,
       // userId: currentUser.id
      }
    });
  
    return NextResponse.json(buyer);
  }