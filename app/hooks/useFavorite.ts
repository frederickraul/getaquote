import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SafeListing, SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";
import getListingById from "../actions/getListingById";

interface IUseFavorite {
  listing: SafeListing;
  currentUser?: SafeUser | null
}

interface IParams {
  listingId?:string;
 }

const useFavorite = ({ listing, currentUser }: IUseFavorite) => {

  const router = useRouter();
  const params:IParams = {listingId: listing?.id};
  const loginModal = useLoginModal();
  

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteListingsIds || [];

    return list.includes(listing?.id);
  }, [currentUser, listing?.id]);

  // const [recipientId, setRecipientId] = useState(listing?.userId);
  


  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      let notification;

      if (hasFavorited) {
        
        request = () => axios.delete(`/api/favorites/listings/${listing?.id}`);
      } else {
        request = () => axios.post(`/api/favorites/listings/${listing?.id}`);
        axios.post(`/api/notifications`, {
            type:'favoriteListing',
            recipientId:listing?.userId,
            senderId:currentUser.id,
            senderName: currentUser.name,
            listing: listing
          })
       
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
    hasFavorited, 
    listing, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;