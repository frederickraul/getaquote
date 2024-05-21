import prisma from "@/app/libs/prismadb";


export default async function getQuotesByStatus(status?:string) {
  try {
    let query: any = {};

      if (status) {
        query.status = status
      }else{
        query.status = undefined
      }


    const quotes = await prisma.car.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    if(!quotes){
      return null;
    }

    const safeQuotes = quotes.map((quote) => ({
      ...quote,
      vehicle: quote?.year+" "+quote.make+" "+quote.model,
      createdAt: quote.createdAt.toISOString(),
      
    }));

    return safeQuotes;
  } catch (error: any) {
    return null;
    throw new Error(error);
  }
}