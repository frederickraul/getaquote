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
      year,
      make,
      model,
      ownershipDocument,
      paidOff,
      vehicleCondition,
      wheels,
      bodyDamage,
      partMissing,
      allWheels,
      battery,
      catalytic,
      vin,
      mileage,
      bodyDamageDescription,
      partMissingDescription,
      city,
      state,
      zip,
      phone,
      phone2,
      name,
      lastname,
      engine,
      noOrder,
      price,
      price2,
      status,
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
        year,
        make,
        model,
        ownershipDocument,
        paidOff,
        vehicleCondition,
        wheels,
        bodyDamage,
        partMissing,
        allWheels,
        battery,
        catalytic,
        vin,
        mileage,
        bodyDamageDescription,
        partMissingDescription,
        city,
        state,
        zip,
        phone,
        phone2,
        name,
        lastname,
        engine,
        noOrder,
        price,
        price2,
        status,
      }
    })
  
    return NextResponse.json(quote);
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