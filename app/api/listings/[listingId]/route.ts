import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
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
    const { listingId } = params;

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    coverSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    state,
    city,
    pin,
    zipcode,
    phone,
    formattedPhone,
    website,
    facebook,
    twitter,
    instagram,
    address,
    visibleAddress,
    apartment,
    horary,
    price
  } = body;


  Object.keys(body).forEach((value: any) => {
    if(!body[value]){
      NextResponse.error();
    }
  });

 

  const listing = await prisma.listing.update({
    where:{
      id:listingId,
    },
    data: {
      title,
      description,
      imageSrc,
      coverSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location.value,
      state: state.label,
      stateCode: state.value,
      city: city.label,
      cityCode: state.value,
      pin,
      zipcode,
      phone,
      formattedPhone,
      website,
      facebook,
      twitter,
      instagram,
      address,
      visibleAddress,
      apartment,
      price: parseInt(price,10),
      userId: currentUser.id,
      horary: {
        set: horary
      },
    }
  })
  return NextResponse.json(listing);
}


export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}