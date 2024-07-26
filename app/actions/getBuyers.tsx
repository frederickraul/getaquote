import prisma from "@/app/libs/prismadb";


export default async function getBuyers(
) {
  try {


    let query: any = {};

    const items = await prisma.buyer.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeItems = items.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      value: item.email,
      label: item.email,
      name: item.name,
      
    }));

    return safeItems;
  } catch (error: any) {
    throw new Error(error);
  }
}