
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
  readonly?: boolean;
  small?: boolean;
  optional?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  rowsNumber?: number;
}

const InputText: React.FC<InputProps> = ({
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
  required,
  rowsNumber,

}) => {
  return (
    <div className="w-full relative">
      {formatPrice  && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <textarea
        
        value={value}
        onChange={(value) => onChange(value)}
        rows={rowsNumber ? rowsNumber : 5}
        disabled={disabled}
        readOnly={readonly}
        placeholder=" "
        className={`
          resize-none
          peer
          w-full
          pt-6
          font-light
          ${readonly ? 'bg-neutral-300' : 'bg-white'}
          border-2
          rounded-md
          outline-nonde
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'p-2' : 'p-4'}
          ${small ? 'p-3' : 'pt-6'}
          ${small ? 'font-light' : 'font-semibold'}
          ${type === "checkbox" ? 'w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600': ''}
        `}
      />
      <label 
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
        `}
      >
        {label}
        {optional && <span className="text-zinc-700"> (Optional)</span>}
      </label>
    </div>
  )
}

export default InputText