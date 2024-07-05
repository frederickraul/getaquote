
import getCurrentUser from '@/app/actions/getCurrentUser copy';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'


export async function POST(
  request: Request
) {

  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    name,
    address,
    location,
    phone,
    email,
  } = body;

  try {
    const setting = await prisma.setting.findFirst({
      where: {
        name: 'business',
      },
    })

    if (!setting) {
      const setting = await prisma.setting.create({
        data:{
          name:'business',
          values:{ 
              set:{
                name:name,
                address:address,
                location:location,
                phone:phone,
                email:email,
              }
          }
        }
      })
      return NextResponse.json(setting);
    }


    const updatedSetting = await prisma.setting.update({
      where: { id: setting.id },
      data: {
        values:{ 
          set:{
            name:name,
            address:address,
            location:location,
            phone:phone,
            email:email,
          }
        }
         
        
      }
    });

    return NextResponse.json(updatedSetting);

  } catch (error: any) {
    throw new Error(error);
  }


}






