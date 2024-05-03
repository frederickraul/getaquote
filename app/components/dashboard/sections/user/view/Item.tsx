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
    <div className="text-lg flex flex-col mt-2"> 
    <span className="font-bold">{label} </span>
    <span className="text-black">{value}</span>
  </div>
  )
}

export default Item;