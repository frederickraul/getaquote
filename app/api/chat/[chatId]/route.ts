import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  chatId?: string;
}

export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
   

}



export async function DELETE(
    request:Request,
    { params }: { params: IParams }
    ) {
  
      const { chatId } = params;
      console.log(`id: ${chatId}`)
  
      const currentUser = await getCurrentUser();
      if(!currentUser){
        return NextResponse.error();
      }
  
      const notification = await prisma.message.deleteMany({
        where: {
          chatId: chatId,
          userId: currentUser.id
        }
      });
  
      return NextResponse.json(notification);
  
  }
  
  

