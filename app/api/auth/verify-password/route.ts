
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailSender } from '@/app/const/emails';
import bcryptjs from 'bcryptjs';


export async function POST(
  request: Request
) {
  
  // const currentUser = await getCurrentUser();
  // if(!currentUser){
  //   return NextResponse.error();
  // }

  const body = await request.json();

  console.log(body);
  const {
    email,
    oldPassword,
    newPassword,
  } = body;

try{
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    return NextResponse.json(null);
  }
  const isOk = await bcryptjs.compare(oldPassword, user.hashedPassword);

  console.log("isOk:", isOk);
  if (!isOk) {
    return null;
  }

      // Hash the new password before saving it to the database
      const hashedPassword = await bcryptjs.hash(newPassword, 12);

      const updatedUser = await prisma.user.update({
        where: {id: user.id},
        data:{
          hashedPassword: hashedPassword,
          emailResetPassword: null,
          passwordResetTokenExpires: undefined
        }
      });

      if(updatedUser){
        return NextResponse.json(updatedUser);
      }


  return NextResponse.json(isOk);

} catch (error: any) {
    throw new Error(error);
}
  

}






