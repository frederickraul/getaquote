import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession} from 'next-auth/next';
import prisma from '@/app/libs/prismadb';

interface IParams {
 notificationId?:string;
}
export default async function getNotificationById(
  params: IParams
) {
try {

  const {notificationId} = params;

   const notification = await prisma.notification.findUnique({
    where:{
      id: notificationId as string
    }
   });

   if(!notification){
    return null;
   }

   return notification;
   
} catch (error:any) {
  return null;
}
}