
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'

import bcryptjs from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';


export async function POST(
  request: Request
) {

  const body = await request.json();

  const {
    userId,
  } = body;


try{

const session = await getServerSession(authOptions);
const newToken = session?.user?.token
    
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return NextResponse.json(null);
  }

      const updatedUser = await prisma.user.update({
        where: {id: user.id},
        data:{
          token: newToken,
        }
      });

      if(updatedUser){
        return NextResponse.json({isOk:true});
      }


  return NextResponse.json({isOk:false});

} catch (error: any) {
    throw new Error(error);
}
  

}






