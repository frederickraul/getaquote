import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeProduct, SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  product: SafeProduct;
  currentUser?: SafeUser | null
}

interface IParams {
  productId?:string;
 }

const useFavoriteProduct = ({ product, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const params:IParams = {productId: product?.id};

  const loginModal = useLoginModal();

  const hasFavoritedProduct = useMemo(() => {
    const list = currentUser?.favoriteProductsIds || [];

    return list.includes(product?.id);
  }, [currentUser, product?.id]);

  const toggleFavoriteProduct = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavoritedProduct) {
        request = () => axios.delete(`/api/favorites/products/${product?.id}`);
      } else {
        request = () => axios.post(`/api/favorites/products/${product?.id}`);
        axios.post(`/api/notifications`, {
          type:'favoriteProduct',
          recipientId:product?.userId,
          senderId:currentUser.id,
          senderName: currentUser.name,
          product: product
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
    hasFavoritedProduct, 
    product, 
    loginModal,
    router
  ]);

  return {
    hasFavoritedProduct,
    toggleFavoriteProduct,
  }
}

export default useFavoriteProduct;