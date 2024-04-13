import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseNotification {
    notificationId?: any | null,
    currentUser?: SafeUser | null

}

const useNotification = ({  notificationId, currentUser }: IUseNotification) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const setAnswer = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
       request = () =>  axios.post(`/api/notifications/${notificationId}`);
      
      await request();
      router.refresh();
      //toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    loginModal,
    router
  ]);

  const setRead = useCallback(async (notificationId:string) => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
       request = () =>  axios.post(`/api/notifications/setread/${notificationId}`);
      
      await request();
      router.refresh();
      //toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    loginModal,
    router
  ]);

  const deleteNotification = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
       request = () =>  axios.delete(`/api/notifications/${notificationId}`);
      
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
    setRead,
    setAnswer,
    deleteNotification
  }
}

export default useNotification;