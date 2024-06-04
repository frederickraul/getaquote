
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

interface IParams {
  ids?: string[];
}

export async function POST(
  request: Request
) {
  // const currentUser = await getCurrentUser();
  // if(!currentUser){
  //   return NextResponse.error();
  // }
  const body = await request.json();

  console.log(body);

  const {
    name,
    email,
    phone,
   
  } = body?.data;



  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const buyer = await prisma.buyer.create({
    data: {
    name,
    email,
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
  // if(!currentUser){
  //   return NextResponse.error();
  // }

  const body = await request.json();

  const {
    ids
  } = body;


  const buyers = await prisma?.buyer.deleteMany({
    where: { id: { in: ids } },
  });

  return NextResponse.json(buyers);
}

