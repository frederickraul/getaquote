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
    <div className="text-lg flex flex-col md:flex-row mt-2"> 
    <div className="font-bold whitespace-nowrap">{label} </div>
    <div className="text-black sm:ml-2">{value}</div>
  </div>
  )
}

export default Item;