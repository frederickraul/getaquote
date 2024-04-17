import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import axios from "axios";

export default async function getAllModelByMakeId(makeId:string) {
 

  try {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/440?format=json');
   if(response){
    const modelList =response.data.Results;
    console.log(modelList);
    // const safeMakes = makeList.map((make) => ({
    //   ...listing,
    //   label: make,
    // }));
    return response.data.Results;
   }
   return null;
  } catch (error) {
    console.error(error);
  }
}