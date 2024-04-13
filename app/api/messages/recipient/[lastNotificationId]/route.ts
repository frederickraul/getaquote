import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  lastNotificationId?: string;
}

export async function POST(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { lastNotificationId } = params;
    
    const notifications = await prisma.notification.findMany({
      where:{
        AND:[
          {
            recipientId: currentUser.id,
          },{
            status: 0,
          }
        ]
      },
      orderBy: [
        {
          status: 'asc',
        },
        {
          createdAt: 'desc'
        }
      ],
      include:{
        sender:true,
      }
  });
    
    return NextResponse.json(notifications);
}

export async function GET(
  request:Request,
  { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return NextResponse.error();
    }
    const { lastNotificationId } = params;
    
    const notifications = await prisma.notification.findMany({
      where:{
        AND:[
          {
            recipientId: currentUser.id,
          },{
            status: 0,
          }
        ]
      },
      orderBy: [
        {
          createdAt: 'desc'
        },
      ],
      take: 1,
      include:{
        sender:true,
      }
  });

    if(notifications){
     const notificationId = notifications[0].id;
    
      if(notificationId){
        return NextResponse.json({lastNotificationId: notificationId});
        }  
    }
    return NextResponse.json({lastNotificationId: lastNotificationId});

}


