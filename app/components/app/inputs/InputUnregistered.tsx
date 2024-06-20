
'use client';

import { Button, Icon, Tooltip } from "@mui/material";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FcInfo } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
//import {Icon} from 'react-icons-kit';


interface InputProps{
  value?: any;
  checked?: boolean;
  onChange: (value: any) => void;
  label: string;
  type?: string;
  disabled?: boolean;
  readonly?: boolean;
  small?: boolean;
  optional?: boolean;
  formatPrice?: boolean;
  formatWebsite?: boolean;
  required?: boolean;
  error?:boolean;
  placeholder?:string;
  infoMessage?:string;
}

const InputUnregistered: React.FC<InputProps> = ({
  value,
  onChange,
  checked,
  label,
  optional,
  type,
  disabled,
  readonly,
  small,
  formatPrice,
  formatWebsite,
  required,
  error,
  placeholder,
  infoMessage,

}) => {

  const [isHidden, setIsHidden] = useState(true);
  const [status, setStatus] = useState(type || 'text');

  const handleToggle = () => {
    if (status==='password'){
      setStatus('text');
      setIsHidden(false);
    } else {
      setStatus('password');
      setIsHidden(true);
    }
 }


  return (
    <>
    <div className="w-full relative">
    <div className="font-bold text-lg p-0 mb-0 flex flex-row">
      {label && label}
      {required && <span className="text-red-500"> * </span>}
      {infoMessage && <Tooltip title={infoMessage} content={infoMessage} enterTouchDelay={0}>
          <div className="ml-2 cursor-pointer">
          <FcInfo/>
          </div>
        </Tooltip>}
      {error && <span className='ml-5 text-sm font-bold text-red-500'>Required</span>}

      
    </div>
    <div className="relative">
    <input
        autoComplete="off"
        value={value}
        onChange={(value) => onChange(value)}
        checked={checked}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder}
        type={status}
        className={`
        input 
        peer
        w-full
        font-light
        ${readonly ? 'bg-neutral-300':'bg-white'}
        border-[1px]
        border-neutral-300
        focus:outline-blue-500
        rounded-sm 
        
        outline-nonde
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'p-2' : 'p-2'}
        ${small ? 'p-3' : 'pt-3'}
        ${small ? 'font-light' : 'font-semibold'}
        
        `}
        />
      {
        type =="password" &&
        <span className="absolute right-3 top-3" onClick={handleToggle}>
        <div className="">
            {isHidden ?  <IoIosEyeOff size={20}/> :  <IoIosEye size={20}/>}
        </div>
      </span>
      }
    </div>
    </div>
    </>
  )
}

export default InputUnregistered