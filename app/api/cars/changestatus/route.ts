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
    // if(!currentUser){
    //   return NextResponse.error();
    // }
  
    const body = await request.json();
  
    const {
      ids,
      status,
      buyerName,
      buyerEmail,
    } = body;

  
    ids?.map((element: string) => {
      console.log(element);
    });
  
    const transaction = await prisma.$transaction(
      ids?.map((id:any) =>
        prisma?.car.update({
          where: { id: id },
          data: {status:status,buyerName:buyerName,buyerEmail:buyerEmail },
        })
      )
    );
  
    return NextResponse.json(transaction);
  }
  
  