import prisma from "@/app/libs/prismadb";


export default async function getSettingsByName(name?:string) {
  try {
    let query: any = {};

      if (name) {
        query.name = name
      }else{
        query.name = undefined
      }


    const setting = await prisma.setting.findFirst({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    if(!setting){
      return null;
    }



    return setting;

  } catch (error: any) {
    return null;
    throw new Error(error);
  }
}