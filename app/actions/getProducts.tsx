import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  userId?: string;
  listingId?: string;
  category?: string;
}

export default async function getProducts(
  params: IProductsParams
) {
  try {
    const {
      userId,
      listingId,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (listingId) {
        query.listingId = listingId;
    }

   


   
    const products = await prisma.product.findMany({
      where: query,
      include:{
        rating:true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const SafeProduct = products.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
    }));

    return SafeProduct;
  } catch (error: any) {
    throw new Error(error);
  }
}