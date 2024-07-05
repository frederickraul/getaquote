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
    value?: string;
    onChange: (value?: string) => void;
    small?:string;
    disabled?: boolean;
}

const CustomSelect:React.FC<SelectProps> = ({
  options,
  value,
  small,
  disabled,
  onChange
}) => {
  return ( 
    <div className="custom-select relative">
      <select
        disabled={disabled}
        value={value}
        className={`
        peer
        w-full
        font-bold border-neutral-300
        ${small ? 'text-xs' : 'text-sm 2xl:text-base'}
        ${small ? 'p-2' : 'p-2 2xl:p-4'}
        ${small ? 'p-3' : 'pt-3'}
        pr-[40px]
        bg-transparent
        border-2
        rounded-md
        transition
         disabled:bg-gray-300
        disabled:cursor-not-allowed
        z-10
        `}
        onChange={e => onChange(e.target.value)} 
      >
        {options.map((option,i)=>(
          <option key={i} value={option.value}>{option.label}</option>
        ))}
        </select>
        <i className="z-0"></i>
    </div>
    
  )
}

export default CustomSelect