'use client';
import { useCallback, useEffect, useState } from "react";

import { IoIosClose, IoMdClose } from 'react-icons/io';
import Button from "../Button";
import { AiOutlineClose } from "react-icons/ai";


interface ModalProps {
  isOpen?: boolean;
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
      <div>
        <div>
          {/* CONTENT */}
          <div>
            <div>
              {/* HEADER */}
              <div>

                <div className="text-2xl xl:text-3xl font-semibold">
                    {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative py-3">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 pb-20">
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