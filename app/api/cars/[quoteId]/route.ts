import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParams {
    quoteId?: string;
  }

export async function DELETE(
    request: Request, 
    { params }: { params: IParams }
  ) {
    // const currentUser = await getCurrentUser();
  
    // if (!currentUser) {
    //   return NextResponse.error();
    // }
  
    const { quoteId } = params;
  
    if (!quoteId || typeof quoteId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const listing = await prisma?.car.deleteMany({
      where: {
        id: quoteId,
       // userId: currentUser.id
      }
    });
  
    return NextResponse.json(listing);
  }