import prisma from "@/app/libs/prismadb";

export interface IProductsParams {
  listingId?: string;
}

export default async function getRatingsByListingId(
  params: IProductsParams
) {
  try {
    const {
      listingId,
    } = params;

    let query: any = {};

    if (listingId) {
        query.listingId = listingId;
    }

  
   
    const ratings = await prisma.ratingListing.findMany({
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
      createdAt: rating.createdAt.toISOString(),
    }));

    return SafeRating;
  } catch (error: any) {
    throw new Error(error);
  }
}