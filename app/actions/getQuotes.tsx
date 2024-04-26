import prisma from "@/app/libs/prismadb";


export default async function getQuotes(
) {
  try {


    let query: any = {};



    // if (roomCount) {
    //   query.roomCount = {
    //     gte: +roomCount
    //   }
    // }

    // if (guestCount) {
    //   query.guestCount = {
    //     gte: +guestCount
    //   }
    // }

    // if (bathroomCount) {
    //   query.bathroomCount = {
    //     gte: +bathroomCount
    //   }
    // }

    // if (locationValue) {
    //   query.locationValue = locationValue;
    // }

    // if (startDate && endDate) {
    //   query.NOT = {
    //     reservations: {
    //       some: {
    //         OR: [
    //           {
    //             endDate: { gte: startDate },
    //             startDate: { lte: startDate }
    //           },
    //           {
    //             startDate: { lte: endDate },
    //             endDate: { gte: endDate }
    //           }
    //         ]
    //       }
    //     }
    //   }
    // }

    const quotes = await prisma.car.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeQuotes = quotes.map((quote) => ({
      ...quote,
      createdAt: quote.createdAt.toISOString(),
    }));

    return safeQuotes;
  } catch (error: any) {
    throw new Error(error);
  }
}