'use client';
import { useCallback, useEffect, useState } from "react";

import { IoIosClose, IoMdClose } from 'react-icons/io';
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";


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
    <div>
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
        bg-neutral-800/30


      ">
        <div className={`
          w-full
          ${size === 'sm' ? 'md:w-4/6' : ' md:w-4/6'}
          ${size === 'sm' ? 'lg:w-3/6' : 'lg:w-3/6'}
          ${size === 'sm' ? 'xl:w-2/6' : 'xl:w-2/5'}
          ${size === 'lg' ? 'md:w-5/6' : ' md:w-4/6'}
          ${size === 'lg' ? 'lg:w-4/6' : 'lg:w-3/6'}
          ${size === 'lg' ? 'xl:w-3/6' : 'xl:w-2/5'}
          ${size === 'auto' ? 'md:w-fit' : ' md:w-4/6'}
          ${size === 'auto' ? 'lg:w-fit' : 'lg:w-3/6'}
          ${size === 'auto' ? 'xl:w-fit' : 'xl:w-2/5'}
          
          my-6
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
            <div className={`
              translate
              h-full
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              ${size === 'auto' ? 'md:w-fit' : 'w-full'}
              bg-white
              outline-none
              focus:outline-none 
            `}>
              {/* HEADER */}
              <div className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
              ">
                <button
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-3
                    top-5
                    sm:left-9
                    z-10
                  "
                >
                  <IoIosClose size={40} />
                </button>
                <div className="text-base xl:text-lg font-semibold">
                    {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto overflow-y-auto min-h-[150px]">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2">
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
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  
                     {onSubmit && actionLabel &&
                      <Button 
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
    </div>
  )
}

export default Modal