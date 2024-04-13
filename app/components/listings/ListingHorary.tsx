'use client';

import { useState } from "react";
import OperationStatus from "./ListingTime";
import { Horary, Listing } from "@prisma/client";
import { MdArrowCircleUp, MdArrowDropDown } from "react-icons/md";
import { SafeListing } from "@/app/types";

interface ListingHoraryProps {
  data:Listing,

}

const ListingHorary:React.FC<ListingHoraryProps> = (
  data
) => {

  return (
    <div></div>
  )
}

export default ListingHorary