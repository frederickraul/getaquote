import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  productId?: string;
}

export default async function getRatingsByProductId(
  params: IProductsParams
) {
  try {
    const {
      productId,
    } = params;

    let query: any = {};

    if (productId) {
        query.productId = productId;
    }

  
   
    const ratings = await prisma.ratingProduct.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
      },
    });

    const SafeRating = ratings.map((rating) => ({
      ...rating,
      user: rating.user.name,
      createdAt: rating.createdAt.toISOString(),
    }));

    return SafeRating;
  } catch (error: any) {
    throw new Error(error);
  }
}