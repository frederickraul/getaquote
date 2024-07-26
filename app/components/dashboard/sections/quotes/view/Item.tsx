import React from 'react'

interface ItemProps {
    label: string;
    value: any;
  }
  
  const Item: React.FC<ItemProps> = ({
    label,
    value,
  }) => {
  return (
    <div className="text-lg mt-2"> 
    <span className="font-bold whitespace-nowrap">{label} </span>
    <span className="text-black sm:ml-2">{value}</span>
  </div>
  )
}

export default Item;