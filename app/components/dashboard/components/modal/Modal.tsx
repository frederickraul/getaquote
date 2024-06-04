'use client';
import { useCallback, useEffect, useState } from "react";

import { IoIosClose, IoMdClose } from 'react-icons/io';
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/app/components/app/Button";


interface ModalProps {
  isOpen?: boolean;
  onClose: () =>void;
  onSubmit?: () =>void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () =>void;
  secondaryActionLabel?: string;
  size?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  size
}) => {

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
     setShowModal(isOpen);
  }, [isOpen]);
  
  const handleClose = useCallback(() =>{
    if(disabled){
      return;
    }

    setShowModal(false);
    setTimeout(()=>{
      onClose();
    }, 300);
  },[disabled, onClose]);

  const handleSubmit = useCallback(() =>{
    if(disabled){
      return;
    }

    if(onSubmit){
      onSubmit();
    }
  },[disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() =>{
    if(disabled || !secondaryAction){
      return;
    }

   secondaryAction();
  },[disabled, secondaryAction ]);

  if(!isOpen){
    return null;
  }
  
  return (
    <>
      <div className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed 
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-black
      ">
        <div className={`
          relative
          w-full
          p-5
          md:max-w-xl
          md:mb-20
          ${size === 'sm' ? 'md:w-4/6' : ' md:w-4/6'}
          ${size === 'sm' ? 'lg:w-3/6' : 'lg:w-3/6'}
          ${size === 'sm' ? 'xl:w-2/6' : 'xl:w-2/5'}
          ${size === 'lg' ? 'md:w-5/6' : ' md:w-4/6'}
          ${size === 'lg' ? 'lg:w-4/6' : 'lg:w-3/6'}
          ${size === 'lg' ? 'xl:w-3/6' : 'xl:w-2/5'}
          xl:w-2/5
         
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        `}>
          {/* CONTENT */}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className='
              translate
              h-full
              sm:max-h-[85vh] 
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              bg-white
              outline-none
              focus:outline-none 
            '>
              {/* HEADER */}
              <div className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              ">
                <div className="text-base xl:text-lg font-semibold">
                    {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto overflow-y-auto min-h-[150px]">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel &&(
                    <Button 
                    full
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  
                     {onSubmit && actionLabel &&
                      <Button 
                      full
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                      />
                    }
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal