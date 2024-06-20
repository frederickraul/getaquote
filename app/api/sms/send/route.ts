
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

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
    engine,
    buyer,
    subject,
    message,
    sign,
    buyerEmail,
  } = body.data;
  if(!buyerEmail){
    return NextResponse.json(null);
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const completeMessage = `

Picked Up: $ ?
  
Dropped Off: $ ?
  
Vehicle Details
Vehicle: 
${year} ${make} ${model}

Ownership Documents: 
${ownershipDocument}

Is Your Vehicle paidOff: 
${paidOff}

Vehicle ID Number: 
${vin}

Vehicle Mileage: 
${mileage}

Vehicle Operating Condition: 
${vehicleCondition}

Is There Body Damage: 
${bodyDamage} ${bodyDamageDescription}

Any Parts Missing: 
${partMissing} ${partMissingDescription}

Are Your Wheels Aluminum Or Steel?: 
${wheels}

Does It Have All Wheels: 
${allWheels}

Does It Have A Battery: 
${battery}

Catalytic Converter: 
${catalytic}

Vehicle Location: 
${city}, ${state} ${zip}

${(sign !== "") && sign }
  `
 const sendedMessage =  client.messages
    .create({
      from: '+18777804236',
      // to: '+526642020991',
      to: '+526642020991',
      body: `${completeMessage}`
     })
    .then((message:any) => {return NextResponse.json(message);}
    );

  //   const { data, error } = await resend.emails.send({
  //     from: `The Quote Form <${EmailSender}>`,
  //     to: [`${buyerEmail}`],
  //     subject: `${subject}`,
      // html: ,
    
  // });
  
  //   if (error) {
  //     return NextResponse.json(error);
  //   }
  

  return NextResponse.json(null);
}






