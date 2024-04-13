'use client';

import { AiFillCodepenCircle, AiFillEdit, AiFillHeart, AiOutlineCodepenCircle, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";
import { BiEdit, BiEditAlt, BiPencil, BiSolidEdit, BiSolidEditAlt, BiSolidPencil } from "react-icons/bi";
import { GiPencil } from "react-icons/gi";
import { TbPencil } from "react-icons/tb";
import { MdDelete, MdDeleteForever } from "react-icons/md";

interface HeartButtonProps {
  disable?: boolean;
  currentUser?: SafeUser | null;
  action?:()=>void;
}

const DeleteButton: React.FC<HeartButtonProps> = ({ 
  currentUser,
  disable,
  action
}) => {


  return (
    <div 
    onClick={action&&action}

      className=' 
                  absolute 
                  top-0 
                  bottom-0 
                  right-0 
                  left-0 
                  transition
                  rounded-md
                  '>

    <div 
      className="
      absolute
      -top-[2px]
        left-[4px]
        flex
        items-center
        justify-center
        transition
        cursor-pointer
        bg-red-600
        hover:bg-black
        rounded-full
        w-6
        h-6
        hover:scale-125
        
      "
    >
      <MdDeleteForever
        size={20}
        className='
        fill-white 

        '
      />

    </div>
    </div>
   );
}
 
export default DeleteButton;