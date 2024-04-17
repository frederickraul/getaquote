import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import axios from "axios";

export default async function getAllMakesByYear(year:string) {
 

  try {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year='+year+'&format=json');
   if(response){
    const makeList =response.data.Results;
    console.log(makeList);
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