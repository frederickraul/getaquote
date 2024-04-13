import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseOwner {
  listingId?: string;
  productId?: string;
  currentUser?: any | null;
  type?:string;
}

const useOwner = ({ listingId, currentUser,productId,type }: IUseOwner) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasOwner = useMemo(() => {
    let list= [];
    let itemId = listingId;
    
    list = currentUser?.listings || [];
    if(type == "product"){
        itemId = productId;
        list = currentUser?.products || [];
    }

    return list.find((element:any) => {
      return element.id === itemId;
    })
  }, [currentUser, listingId, productId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasOwner) {
        request = () => axios.delete(`/api/favorites/listings/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/listings/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasOwner, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasOwner,
    toggleFavorite,
  }
}

export default useOwner;