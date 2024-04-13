'use client';

import { defaultImage } from "@/app/const";
import { Rating } from "@mui/material";
import Image from "next/image";
import StyledRating from "../StyledRating";
import { start } from "repl";
import { formatDate } from "@/app/const/hours";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "../Button";
import { SafeUser } from "@/app/types";


interface ReviewProps {
    data: any;
    onEdit:(id:string)=>void;
    onDelete:(id:string)=>void;
    currentUser?: SafeUser | null;

  }
  const ReviewCard: React.FC<ReviewProps> = ({
    data,
    onEdit,
    onDelete,
    currentUser
  }) => {
  const {id, image, title, body, user,userId, rating, createdAt} = data;
  return (
    
<div className="
        border-[1px]
        border-neutral-100
        border-tr
        p-5
        mt-4
        shadow-sm
        
        ">

            
            <div className="flex flex-row items-center232">
                <Image
                sizes='100'
                priority={false}
                width={50}
                height={50}
                alt='Listing'
                src={user?.image || defaultImage}
                className='rounded-3xl bg-cover aspect-square'
                />
                <div className="ml-3 flex flex-col">
                    <span className="text-sm font-bold">{user?.name}</span>
                    <span className="text-xs font-light text-neutral-400"> {formatDate(createdAt)}</span>
                </div>
               
            </div>

            <div className="mt-6 flex flex-row items-center">
            <StyledRating value={rating}/>
            
                <span className="text-xs ml-2">{rating}</span>
            </div>

            <div className="mt-4 flex flex-col">
                <div className="font-bold mb-3">{title}</div>
                <span className="text-neutral-700">
                    {body}  
                </span>
            </div>
            {/* Only review owner */}
            {currentUser?.id === userId && 
                <div className="pt-2 mt-2  border-t-[1px] border-neutral-200 ">
                    <div className="w-1/2 flex flex-row">
                    <div className="w-1/2 md:w-1/4">
                    <Button small label="Edit" outline onClick={()=>onEdit(id)}/>
                    </div>
                    <div className="w-1/2 md:w-1/4">
                    <Button small styles="border-red-500 text-red-500 ml-4" label="Delete" outline onClick={()=>onDelete(id)}/>
                    </div>
                        
                    </div>
                </div>
            }
        </div>  )
}

export default ReviewCard