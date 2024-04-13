'use client';

import { IconType } from "react-icons";

interface CategoryInputProps{
  icon: IconType
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;

}
const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  label,
  selected,
  icon: Icon
}) => {
  return (
    <div
      onClick={()=>onClick(label)}
      className={`
        rounded-xl
        border-2
        p-2 2xl:p-4
        flex
        flex-row 2xl:flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-x-neutral-200'}
      `}
    >
      <Icon size={30}/>
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput