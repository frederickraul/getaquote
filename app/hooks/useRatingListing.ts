import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";
import getRatingListing from "../actions/getRatingByListingId";

interface IUseRatingListing {
  listingId: string;
  currentUser?: SafeUser | null
}

const useRatingListing = ({ listingId, currentUser }: IUseRatingListing) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasRating = useMemo(() => {
    const list = getRatingListing || [];

    return list;
  }, [currentUser, listingId]);

  

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    // try {
    //   let request;

    //   if (hasRating) {
    //     request = () => axios.delete(`/api/favorites/listings/${listingId}`);
    //   } else {
    //     request = () => axios.post(`/api/favorites/listings/${listingId}`);
    //   }

    //   await request();
    //   router.refresh();
    //   toast.success('Success');
    // } catch (error) {
    //   toast.error('Something went wrong.');
    // }
  }, 
  [
    currentUser, 
    hasRating, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasRating,
    toggleFavorite,
  }
}

export default useRatingListing;