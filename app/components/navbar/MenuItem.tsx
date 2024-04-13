'use client';
import { IconType } from "react-icons";

 

interface MenuItemProps {
    onClick: () => void;
    label: String;
    icon?: IconType;
    style?: String;
    link?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    style,
    onClick,
    label,
    link
}) => {
  return (
    <a onClick={(e)=>e.preventDefault()}  href={link}>
      <div
        onClick={onClick}
        className="
             px-4
             py-3
             hover:bg-neutral-100
             transition
             font-semibold
             flex
             flex-row
             items-center
        ">
        {Icon && <Icon size={16} className={`mr-1 ${style}`}/>}
        {label}
      </div>
    </a>
  )
}

export default MenuItem