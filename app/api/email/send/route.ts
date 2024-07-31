
import { NextResponse } from 'next/server'

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
    address,
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
  
  const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `The Quote Form <${EmailSender}>`,
      to: [`${buyerEmail}`],
      subject: `${subject}`,
      html: `
      <strong>Picked Up: </strong>
      <span>$ ?</span>
      <br>
      <strong>Dropped Off: </strong>
      <span>$ ?</span>

      <br> <br>
      <strong>Vehicle Details</strong>
      <br>
        <strong>Vehicle: </strong> 
        <span>${year} ${make} ${model}</span>
      <br><br>
          <strong>Ownership Documents: </strong> 
          <span>${ownershipDocument}</span>
      <br><br>
        <strong>Is Your Vehicle paidOff: </strong>
        <span>${paidOff}</span>
      <br><br>
          <strong>Vehicle ID Number: </strong>
          <span>${vin}</span>
      <br><br>
            <strong>Vehicle Mileage: </strong>
            <span>${mileage}</span>
      <br><br>
            <strong>Vehicle Operating Condition: </strong>
            <span>${vehicleCondition}</span>
      <br><br>
            <strong>Is There Body Damage: </strong>
            <span>${bodyDamage} ${bodyDamageDescription}</span>
      <br><br>
            <strong>Any Parts Missing: </strong>
            <span>${partMissing} ${partMissingDescription}</span>
      <br><br>
            <strong>Are Your Wheels Aluminum Or Steel?: </strong>
            <span>${wheels}</span>
      <br><br>
        <strong>Does It Have All Wheels: </strong>
        <span>${allWheels}</span>
      <br><br>
        <strong>Does It Have A Battery: </strong>
        <span>${battery}</span>
      <br><br>
        <strong>Catalytic Converter: </strong>
        <span>${catalytic}</span>
      <br><br>
        <strong>Vehicle Location: </strong>
        <span>${city}, ${state} ${zip}</span>
      <br><br>
      <span>${(sign !== "") && sign }</span>
      `,
    
  });
  
    if (error) {
      return NextResponse.json(error);
    }
  

  return NextResponse.json(data);
}






