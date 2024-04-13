
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
      listingId
    } = body;


    Object.keys(body).forEach((value: any) => {
      if(!body[value]){
        NextResponse.error();
      }
    });

    const product = await prisma.product.create({
      data: {
        title,
        description,
        coverSrc,
        category,
        THC: Number(THC),
        CBD:Number(CBD),
        portion,
        totalPrice: Number(totalPrice),
        stock: Number(stock),
        userId: currentUser.id,
        listingId: listingId,
      }
    })

    return NextResponse.json(product);
}