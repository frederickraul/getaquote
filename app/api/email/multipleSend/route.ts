
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';


import { Resend } from 'resend';
import { EmailSender } from '@/app/const/emails';
import axios from 'axios';


export async function POST(
  request: Request
) {
  
  const body = await request.json();
  const {
    subject,
    sign,
    buyerEmail,
    buyerName,
  } = body.data;

  const {quotes} = body;


  if(!buyerEmail){
    return NextResponse.json(null);
  }



  // quotes?.map((element: string) => {
  //   console.log('ID: ' + element);
  // });

  // quotes?.map((quoteId: string) => setTimeout(async() => {
  //   const quote = await prisma.car.findUnique({
  //     where: {
  //       id: quoteId as string,
  //     },
  //   });
  //   let data = {
  //     ...quote,
  //     buyerName:buyerName,
  //   buyerEmail:buyerEmail,
  //   sign:sign,
  //   subject:subject,
      
  //   }
   
  //   console.log('Quote:' + quote?.id);
  //   sendEmail(data);
  // },2000));
  
  

  const transaction = await prisma.$transaction(
    quotes?.map((value:any) =>
      prisma?.car.update({
        where: { id: value },
        data: {status:'processing',buyerName:buyerName,buyerEmail: buyerEmail},
      })
    )
  );

   const size = transaction.length;
    for (let i = 0; i < size; ++i) { 
    const quote = transaction[i];
    await waitforme(500); 

    let data = {
          ...quote,
          buyerName:buyerName,
        buyerEmail:buyerEmail,
        sign:sign,
        subject:subject
      };

      sendEmail(data);
      console.log('Email: '+ data?.id);
} 
console.log("Loop execution finished!)"); 


  return NextResponse.json(null);
}

function waitforme(millisec:number) { 
  return new Promise(resolve => { 
      setTimeout(() => { resolve('') }, millisec); 
  }) 
} 

async function printy() { 
  
} 

const sendEmail = async (quote:any) =>{
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `The Quote Form <${EmailSender}>`,
      to: [`${quote.buyerEmail}`],
      subject: `${quote.subject}`,
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
        <span>${quote.year} ${quote.make} ${quote.model}</span>
      <br><br>
          <strong>Ownership Documents: </strong> 
          <span>${quote.ownershipDocument}</span>
      <br><br>
        <strong>Is Your Vehicle paidOff: </strong>
        <span>${quote.paidOff}</span>
      <br><br>
          <strong>Vehicle ID Number: </strong>
          <span>${quote.vin}</span>
      <br><br>
            <strong>Vehicle Mileage: </strong>
            <span>${quote.mileage}</span>
      <br><br>
            <strong>Vehicle Operating Condition: </strong>
            <span>${quote.vehicleCondition}</span>
      <br><br>
            <strong>Is There Body Damage: </strong>
            <span>${quote.bodyDamage}. ${quote.bodyDamageDescription}</span>
      <br><br>
            <strong>Any Parts Missing: </strong>
            <span>${quote.partMissing}. ${quote.partMissingDescription}</span>
      <br><br>
            <strong>Are Your Wheels Aluminum Or Steel?: </strong>
            <span>${quote.wheels}</span>
      <br><br>
        <strong>Does It Have All Wheels: </strong>
        <span>${quote.allWheels}</span>
      <br><br>
        <strong>Does It Have A Battery: </strong>
        <span>${quote.battery}.</span>
      <br><br>
        <strong>Catalytic Converter: </strong>
        <span>${quote.catalytic}</span>
      <br><br>
        <strong>Vehicle Location: </strong>
        <span>${quote.city}, ${quote.state} ${quote.zip}</span>
      <br><br>
      <span>${(quote.sign !== "") && quote.sign }</span>
      `,
    
  });
  
    if (error) {
      return NextResponse.json(error);
    }
  
}






