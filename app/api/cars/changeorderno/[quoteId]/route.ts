import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';


interface IParams {
    quoteId?: string;
  }

  export async function POST(
    request: Request,
    { params }: { params: IParams }
  ) {
    // const currentUser = await getCurrentUser();
  
    // if (!currentUser) {
    //   return NextResponse.error();
    // }
  
    const { quoteId } = params;
    const body = await request.json();
  
    const {
      noOrder,
      price,
      price2,
      sellType,
      address,
      city,
      state,
      zip
    } = body;

  
  
  
    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        NextResponse.error();
      }
    });
  
    const quote = await prisma.car.update({
      where:{
        id:quoteId
      },
      data: {
       noOrder,
       sellType,
       price,
       price2,
       address,
       city,
       state,
       zip,
      }
    })
  
    return NextResponse.json(quote);
  }
  

