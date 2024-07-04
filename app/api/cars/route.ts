
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

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
   

  } = body;
  console.log(body);



  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const quote = await prisma.car.create({
    data: {
      year: year.label,
      make: make.label,
      model: model.label,
      ownershipDocument: ownershipDocument.label,
      paidOff: paidOff.label,
      vehicleCondition: vehicleCondition.label,
      wheels: wheels.label,
      bodyDamage: bodyDamage.label,
      partMissing: partMissing.label,
      allWheels: allWheels.label,
      battery: battery.label,
      catalytic: catalytic.label,
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
      noOrder:"",
      price:"",
      price2:"",
      status:"pending"

    }
  })

  return NextResponse.json(quote);
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

  ids?.map((element: string) => {
    console.log(element);
  });

  const quotes = await prisma?.car.deleteMany({
    where: { id: { in: ids } },
  });

  return NextResponse.json(quotes);
}
