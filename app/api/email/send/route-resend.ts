
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser';

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
   

  } = body.data;

  console.log(buyer?.value);


  console.log(buyer?.value);
  const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'The Quote Form <onboarding@resend.dev>',
      to: [`${buyer?.value}`],
      subject: `${subject}`,
      html: `
      ${message && message}
      <br>
      <h1>Vehicle Details</h1>
        <strong>Vehicle: </strong> 
        <span>${year} ${make} ${model}</span>
      <br>
        <strong>Engine: </strong> 
        <span>${engine} </span>
      <br>
        <strong>Ownership Documents: </strong> 
        <span>${ownershipDocument}</span>
      <br>
        <strong>Vehicle ID Number: </strong>
        <span>${vin}</span>
      <br>
        <strong>Vehicle Mileage: </strong>
        <span>${mileage}</span>
      <br>
        <strong>Vehicle Operating Condition: </strong>
        <span>${vehicleCondition}</span>
      <br>
        <strong>Is There Body Damage: </strong>
        <span>${bodyDamage} ${bodyDamageDescription}</span>
      <br>
        <strong>Any Parts Missing: </strong>
        <span>${partMissing} ${partMissingDescription}</span>
      <br>
        <strong>Are Your Wheels Aluminum Or Steel?: </strong>
        <span>${wheels}</span>
      <br>
        <strong>Does It Have All Wheels: </strong>
        <span>${allWheels}</span>
      <br>
        <strong>Does It Have A Battery: </strong>
        <span>${battery}</span>
      <br>
        <strong>Catalytic Converter: </strong>
        <span>${catalytic}</span>
      <br>
        <strong>Vehicle Location: </strong>
        <span>${city}, ${state} ${zip}</span>
      `,
    
  });
  
    if (error) {
      return NextResponse.json(error);
    }
  

  return NextResponse.json(data);
}






import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

