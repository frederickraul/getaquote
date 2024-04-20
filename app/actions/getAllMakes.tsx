import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";
import axios from "axios";

export default async function getAllMakes() {
 

  try {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
   if(response){
    const makeList = response.data.Results;
    // console.log(makeList);
    const safeMakes = makeList.map((make:any) => ({
      value: make.Make_ID,
      label: make.Make_Name,
    }));

   return safeMakes;
   }
   return null;
  } catch (error) {
    console.error(error);
  }
}