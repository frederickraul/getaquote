// app\(front)\reset-password\[token]\route.ts
import { randomBytes } from 'crypto';
import bcryptjs from 'bcryptjs';

import { NextRequest } from 'next/server';

import prisma from '@/app/libs/prismadb';
import { Resend } from 'resend';
import { EmailSender } from '@/app/const/emails';

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.pathname.split('/').pop();
  
  // Find the user by the emailResetPassword token and check if the token has not expired
  // const user = await prisma.user.findUnique({
  //   where: emailResetPassword: token,
  //   $or: [
  //     { passwordResetTokenExpires: { $gt: new Date() } },
  //     { passwordResetTokenExpires: null },
  //   ],
  // });

  const user = await prisma.user.findFirst({
    where: {
      emailResetPassword: token,
    },
  });
  
  console.log(`Token: ${token}`);
  console.log(`Current Time: ${new Date()}`);
  console.log(`Token Expiry: ${user?.passwordResetTokenExpires}`);
  console.log(`Current Time Expiry: ${new Date()}`);

  
  if (user) {
    // If the user is found, generate a new secure password
    const newPassword = generateSecurePassword();

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

    // // Update the user's password and clear the reset token and its expiry
    // user.password = hashedPassword;
    // user.emailResetPassword = null;
    // user.passwordResetTokenExpires = undefined;
    // await user.save();

    // // Send the new password to the user's email
    // await sendNewPasswordEmail(user.email, newPassword);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `The Quote Form <${EmailSender}>`,
      to: [`${user.email}`],
      subject: `Your New Password`,
      html: `Your password has been reset. Here is your new password: <strong>${newPassword}</strong>. It is recommended to change this password after logging in.`,

    });

    // Return a response indicating the new password has been sent
    return new Response('Your new password has been sent to your email.', {
      status: 200,
    });
  } else {
    // If no user is found or the token is expired, return an error response
    return new Response('Password reset token is invalid or has expired.', {
      status: 400,
    });
  }
}

// Helper function to generate a secure password
function generateSecurePassword() {
  return randomBytes(12).toString('hex'); // Generates a random hex string of length 24
}

// Note: Do not use 'export default get;' since we are using named exports.