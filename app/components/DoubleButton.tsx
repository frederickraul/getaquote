'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  labelSecond?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSecond: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  iconSecond?: IconType;
  color?: string,
  borderless?:boolean
  roundless?:boolean
}

const DoubleButton: React.FC<ButtonProps> = ({ 
  label, 
  labelSecond,
  onClick, 
  onClickSecond,
  disabled, 
  outline,
  small,
  icon: Icon,
  iconSecond: Icon2,
  roundless,
  color,
  borderless
}) => {
  return ( 
    <div className="flex flex-col">
      <button
      disabled={disabled}
      onClick={onClick}
      className={`
      mt-1
        relative bg-
        disabled:opacity-70
        disabled:cursor-not-allowed rounded-b-none
        ${roundless || 'rounded-lg'}
        hover:opacity-80
        transition
        w-full
        ${color ? color :  outline ? 'bg-white' : 'bg-green-400'}
        ${borderless ? 'border-transparent' : outline ? 'border-black' : 'border-green-600'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-sm'}
        ${small ? 'py-1' : 'py-2'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-1'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>

    <button
      disabled={disabled}
      onClick={onClickSecond}
      className={`
        mt-1
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed rounded-t-none
        ${roundless || 'rounded-lg'}
        hover:opacity-80
        transition
        w-full
        ${color ? color :  outline ? 'bg-white' : 'bg-black'}
        ${borderless ? 'border-transparent' : outline ? 'border-black' : 'border-black'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-sm'}
        ${small ? 'py-1' : 'py-2'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-1'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {labelSecond}
    </button>
    </div>
   );
}
 
export default DoubleButton;