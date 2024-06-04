import { Icon } from '@mui/material';
import React from 'react'
import { FaCar } from 'react-icons/fa'
import { MdCarRental, MdContactPhone } from 'react-icons/md'

interface TabsProps {
    data:any;
    selected:number;
    onClick:(tab:number)=>void;
  }
  
  const Tabs: React.FC<TabsProps> = ({
    data,
    selected,
    onClick
  }) => {
    return (
        <div className="
                border-b 
                border-gray-200 
                dark:border-gray-700">
            <ul className="
                flex 
                flex-wrap 
                -mb-px 
                text-sm 
                sm:text-base 
                md:text-lg 
                font-medium 
                text-center 
                text-gray-800 
                dark:text-gray-400">
                {data?.map((item:any) => (
                     <li key={item.id} className="me-2" onClick={()=>{onClick(item.id)}}>
                     <a href="#" 
                         className={
                            `inline-flex 
                             items-center 
                             justify-center 
                             p-1 sm:p-4 
                             rounded-t-lg 
                             group
                             ${selected == item.id && 'text-blue-600'}
                             ${selected == item.id && 'border-b-2'}
                             ${selected == item.id && ' dark:border-blue-500 '}
                             ${selected == item.id && 'dark:text-blue-500'}
                             ${selected == item.id && 'border-blue-600'}
                             ${selected !== item.id && 'hover:text-gray-600 '}
                             ${selected !== item.id && 'hover:border-gray-300 '}
                             ${selected !== item.id && 'dark:hover:text-gray-300 '}
                             ${selected !== item.id && 'border-transparent'}
 
                             `
                         }>
                     <Icon className='mr-1'>{item.icon}</Icon>
                     {item.label}
                     </a>
                 </li>

                ))}
                
                

            </ul>
        </div>
    )
}

export default Tabs