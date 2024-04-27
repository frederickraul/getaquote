import prisma from "@/app/libs/prismadb";


export default async function getQuotes(
) {
  try {


    let query: any = {};



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