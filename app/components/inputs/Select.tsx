'use client';

import { hours } from "@/app/const/hours";
import { Icon } from "leaflet";
import { IconType } from "react-icons";

export type CustomOptions ={
  label: string;
  icon?: IconType;
  value: string;
}

interface SelectProps{
    options: CustomOptions[];
    label?:string;
    value?: string;
    required?:boolean;
    onChange: (value?: string) => void;
    small?:string;
    disabled?: boolean;
}

const CustomSelect:React.FC<SelectProps> = ({
  options,
  label,
  required,
  value,
  small,
  disabled,
  onChange
}) => {
  return ( 
    <>
    <div className="font-bold text-neutral-700 text-lg p-0 -mb-2">
      {label && label}
      {required && <span className="text-red-500"> * </span>}
    </div>
      <select
        disabled={disabled}
        placeholder=""
        value={value}
        className={`
        peer
        w-full
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-nonde
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'p-2' : 'p-4'}
        ${small ? 'p-3' : 'pt-6'}
        ${small ? 'font-light' : 'font-semibold'}
        `}
        onChange={e => onChange(e.target.value)} 
        >
        {options.map((option,i)=>(
          <option key={i} value={option.value}>{option.label}</option>
          ))}
        </select>
        <i className="z-0"></i>
          </>
    
  )
}

export default CustomSelect