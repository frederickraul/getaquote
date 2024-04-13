import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  notificationId?: string;
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
    const { notificationId } = params;
    
   
    
        const notification = await prisma.notification.update({
          where:{
            id:notificationId
          },
          data:{
            status:1
          }
        });


    return NextResponse.json(notification);
}
