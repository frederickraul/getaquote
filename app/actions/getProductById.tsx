import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession} from 'next-auth/next';
import prisma from '@/app/libs/prismadb';

interface IParams {
 productId?:string;
}
export default async function getProductById(
  params: IParams
) {
try {

  const {productId} = params;


   const product = await prisma.product.findUnique({
    where:{
      id: productId as string
    },
    include:{
      user: true,
      rating:true,
      listing: true,
    }
   });

   if(!product){
    return null;
   }

   return {
    ...product,
    createdAt: product.createdAt.toISOString(),
    user: {
      ...product.user,
      createdAt: product.user.createdAt.toISOString(),
      updatedAt: product.user.updatedAt.toISOString(),
    }
  };
   
} catch (error:any) {
  return null;
}
}