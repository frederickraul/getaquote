
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

}) => {
  return (
    <div className="w-full relative">
      <PhoneInput
        country={country}
        value={value}
        onChange={(phone,data,evet,formattedPhone) => onChange(phone,formattedPhone)
      }
        disabled={disabled}
        disableDropdown={disableDropdown}
        placeholder=" "
        inputClass={
          `
          w-full
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${small ? 'text-xs' : 'text-sm 2xl:text-base'}
          ${small ? 'p-2' : 'p-2 2xl:p-4'}
          ${small ? 'p-3' : label ? 'pt-4 2xl:pt-6' : 'pt-3'}
          ${small ? 'font-light' : 'font-semibold'}
          `
        }
        containerClass="relative"
        dropdownClass={`${disableDropdown && 'hidden'}`}
      />
      <label 
        className={`
          pl-3
          absolute
          text-xs 2xl:text-base
          duration-150
          transform
          -translate-y-3
          top-4 2xl:top-5
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
           text-zinc-400
        `}
      >
        {label}
        {optional && <span className="text-zinc-700"> (Optional)</span>}
      </label>
    </div>
  )
}

export default InputPhone