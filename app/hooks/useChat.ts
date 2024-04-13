import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseChat {
    chatId?: any | null,
    currentUser?: SafeUser | null

}

const useChat = ({  chatId, currentUser }: IUseChat) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  

  const deleteChatMessages = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
       request = () =>  axios.delete(`/api/chat/${chatId}`);
      
      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    loginModal,
    router
  ]);

  return {
    deleteChatMessages
  }
}

export default useChat;