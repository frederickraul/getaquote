import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  productId?: string;
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
    const { productId } = params;

  const body = await request.json();
  const {
    title,
    description,
    coverSrc,
    category,
    THC,
    CBD,
    portion,
    totalPrice,
    stock,
    listingId,
    userId
  } = body;


  Object.keys(body).forEach((value: any) => {
    if(!body[value]){
      NextResponse.error();
    }
  });

 

  const product = await prisma.product.update({
    where:{
      id:productId,
    },
    data: {
        title,
        description,
        coverSrc,
        category,
        THC:Number(THC),
        CBD:Number(CBD),
        portion,
        totalPrice:Number(totalPrice),
        stock:Number(stock),
        listingId,
        userId
    }
  })
  return NextResponse.json(product);
}



export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid ID');
  }

  const product = await prisma.product.deleteMany({
    where: {
      id: productId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(product);
}

