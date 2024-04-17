'use client';

import { IconType } from "react-icons";
import Select from 'react-select-virtualized';


export type CustomOptions ={
  label: string;
  icon?: IconType;
  value: any;
}

interface SelectProps{
    options: CustomOptions[];
    label?:string;
    value?: any;
    required?:boolean;
    onChange: (value?: string) => void;
    small?:string;
    disabled?: boolean;
}

const SelectVirtualized:React.FC<SelectProps> = ({
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
      <Select
        options={options}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className='selectVirtualized'
        />
       
        <i className="z-0"></i>
          </>
    
  )
}

export default SelectVirtualized