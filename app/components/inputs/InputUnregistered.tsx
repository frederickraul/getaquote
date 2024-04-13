
'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps{
  value?: any;
  checked?: boolean;
  onChange: (value: any) => void;
  label: string;
  type?: string;
  disabled?: boolean;
  small?: boolean;
  optional?: boolean;
  formatPrice?: boolean;
  formatWebsite?: boolean;
  required?: boolean;
}

const InputUnregistered: React.FC<InputProps> = ({
  value,
  onChange,
  checked,
  label,
  optional,
  type,
  disabled,
  small,
  formatPrice,
  formatWebsite,
  required,

}) => {
  return (
    <>
    <div className="w-full relative">
    <div className="font-bold text-neutral-700 text-lg p-0 mb-1">
      {label && label}
      {required && <span className="text-red-500"> * </span>}
    </div>
      <input
      value={value}
      onChange={(value) => onChange(value)}
      checked={checked}
      disabled={disabled}
      placeholder=" "
        type={type}
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
        ${type === "checkbox" ? 'w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600': ''}
        `}
        />
    
    </div>
    </>
  )
}

export default InputUnregistered