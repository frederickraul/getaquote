'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeListing, SafeProduct, SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";
import useFavoriteProduct from "../hooks/useFavoriteProduct";

interface HeartButtonProps {
  item: any;
  type?:string;
  disable?: boolean;
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  item,
  currentUser,
  disable,
  type
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listing:item,
    currentUser
  });

  const { hasFavoritedProduct, toggleFavoriteProduct } = useFavoriteProduct({
    product:item,
    currentUser
  });

  return (
    <div 
      onClick={(e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        
        if(type=="listing"){
          toggleFavorite(e);
        }
        if(type=="product"){
          toggleFavoriteProduct(e);
        }
      }}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
        {type =="listing" &&
            <AiFillHeart
            size={24}
            className={
              hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
            }
            />
        }

        {type =="product" &&
            <AiFillHeart
            size={24}
            className={
              hasFavoritedProduct ? 'fill-rose-500' : 'fill-neutral-500/70'
            }
            />
        }
    </div>
   );
}
 
export default HeartButton;