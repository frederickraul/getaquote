
'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import '@/app/reactInputPhone.css'
interface InputProps{
  country: string;
  value?: any;
  checked?: boolean;
  onChange: (phone: any, formattedPhone: any) => void;
  label: string;
  type?: string;
  disabled?: boolean;
  small?: boolean;
  optional?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  disableDropdown?: boolean;
  dropdownClass?:string;
}

const InputPhone: React.FC<InputProps> = ({
  country,
  value,
  onChange,
  checked,
  label,
  optional,
  type,
  disabled,
  disableDropdown,
  small,
  formatPrice,
  required,
  dropdownClass,

}) => {
  return (
    <div className="w-full relative">
    <div className="font-bold text-neutral-600 text-lg p-0 mb-1">
      {label && label}
      {required && <span className="text-red-500"> * </span>}
    </div>
      <PhoneInput
        country={country}
        value={value}
        onChange={(phone,data,evet,formattedPhone) => onChange(phone,formattedPhone)
      }
        disabled={disabled}
        disableDropdown
        placeholder=" "
        dropdownClass={dropdownClass}
        disableSearchIcon
        inputClass={
          `
          peer
          w-full
          font-light
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
        containerClass="relative"
       
      />

    </div>
  )
}

export default InputPhone