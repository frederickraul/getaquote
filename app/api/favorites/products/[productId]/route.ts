import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  productId?: string;
}

export async function POST(
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

  let favoriteProductsIds = [...(currentUser.favoriteProductsIds || [])];

  favoriteProductsIds.push(productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteProductsIds
    }
  });

  return NextResponse.json(user);
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

  let favoriteProductsIds = [...(currentUser.favoriteProductsIds || [])];

  favoriteProductsIds = favoriteProductsIds.filter((id) => id !== productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteProductsIds
    }
  });

  return NextResponse.json(user);
}