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
    error?:boolean;
    onChange: (value?: string) => void;
    small?:string;
    disabled?: boolean;
}

const SelectVirtualized:React.FC<SelectProps> = ({
  options,
  label,
  required,
  error,
  value,
  small,
  disabled,
  onChange
}) => {
  return ( 
    <>
    <div className="font-bold text-lg p-0 -mb-2">
      {label && label}
      {required && <span className="text-red-500"> * </span>}
      {error && <span className='ml-5 text-sm font-bold text-red-500'>Required</span>}
    </div>
      <Select
        options={options}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className='selectVirtualized'
        />
       
          </>
    
  )
}

export default SelectVirtualized