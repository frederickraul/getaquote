'use client';

import { useCallback, useState } from "react";

import Modal from "./Modal";
import Heading from "../Heading";

import useConfirmModal from '@/app/hooks/useConfirmModal';
import { title } from "process";

interface ModalProps {
  onSubmit:  () => void;
  title?:string;
  body?:string;
}

const ConfirmModal: React.FC<ModalProps> = ({
  onSubmit,
  title,
  body
}) => {
  const confirmModal = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = () => {
    onSubmit();
    confirmModal.onClose();
  }


  const bodyContent = (
    <div className="flex flex-col gap-4 mx-5">
            <div className="sm:flex sm:items-start">
                <div
                    className="
                    mx-auto 
                    flex-shrink-0 
                    flex 
                    items-center 
                    justify-center 
                    h-12 w-12 
                    rounded-full 
                    bg-red-100 
                    sm:mx-0 
                    sm:h-14 
                    sm:w-14
                    ">
                    <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="ml-4">
                <Heading 
                    title={title? title : "Are your sure?"} 
                    subtitle={body? body : "You are about to delete your item!!"}/> 
                </div>
                </div>
          
    </div>
  );

  

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmModal.isOpen}
      title="Danger Zone"
      actionLabel="Continue"
      secondaryActionLabel="Cancel"
      secondaryAction={confirmModal.onClose}
      onClose={confirmModal.onClose }
      onSubmit={onSubmitHandler}
      body={bodyContent}
    />
  )
}

export default ConfirmModal