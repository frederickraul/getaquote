
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';
import { v4 as uuidv4 } from 'uuid';


import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailSender } from '@/app/const/emails';


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

  // const body = await request.json();
 
  const { email } = await request.json();

  if(!email){
    return NextResponse.json(null);
  }

try{
  // By ID
const user = await prisma.user.findUnique({
  where: {
    email: email,
  },
})

  if(user){
    const passwordResetToken = uuidv4();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { emailResetPassword: passwordResetToken },
    });

    
    const resend = new Resend(process.env.RESEND_API_KEY);
    // const resetPasswordUrl = `http://localhost:3000/auth/reset-password/${encodeURIComponent(passwordResetToken)}`;
    const resetPasswordUrl = `https://getaquote.vercel.app/auth/reset-password/${encodeURIComponent(passwordResetToken)}`;

    const { data, error } = await resend.emails.send({
      from: `The Quote Form <${EmailSender}>`,
      to: [email],
      subject: `Password Reset Request`,
      html: `We received a request to reset your password for our app. Please click on the following link to reset your password: <a href="${resetPasswordUrl}">Reset Password</a>. If you did not request a password reset, please ignore this email.`,

      
    });

    if (error) {
      return NextResponse.json(error);
    }

    return new Response(JSON.stringify({ message: 'A password reset link has been sent to your email.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
    
  }
   else {
  // Respond with a generic message whether or not the email was found
  // This is a security measure to prevent email enumeration
  return new Response(JSON.stringify({ message: 'If the email is associated with an account, a password reset link will be sent.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

} catch (error: any) {
  throw new Error(error);
}
}






