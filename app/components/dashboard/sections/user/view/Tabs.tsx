import React from 'react'
import { FaCar } from 'react-icons/fa'
import { MdCarRental, MdContactPhone } from 'react-icons/md'

interface TabsProps {
    selected:number;
    onClick:(tab:number)=>void;
  }
  
  const Tabs: React.FC<TabsProps> = ({
    selected,
    onClick
  }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm sm:text-base md:text-lg font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2" onClick={()=>{onClick(1)}}>
                    <a href="#" 
                        className={
                           `inline-flex 
                            items-center 
                            justify-center 
                            p-4 
                            rounded-t-lg 
                            group
                            ${selected == 1 && 'text-blue-600'}
                            ${selected == 1 && 'border-b-2'}
                            ${selected == 1 && ' dark:border-blue-500 '}
                            ${selected == 1 && 'dark:text-blue-500'}
                            ${selected == 1 && 'border-blue-600'}
                            ${selected !== 1 && 'hover:text-gray-600 '}
                            ${selected !== 1 && 'hover:border-gray-300 '}
                            ${selected !== 1 && 'dark:hover:text-gray-300 '}
                            ${selected !== 1 && 'border-transparent'}

                            `
                        }>
                    <FaCar size={20} className='mr-1'/>
                    Vehicle Details
                    </a>
                </li>
                <li className="me-2" onClick={()=>{onClick(2)}}>
                    <a href="#" 
                        className={
                            `inline-flex 
                             items-center 
                             justify-center 
                             p-4 
                             rounded-t-lg 
                             group
                             ${selected == 2 && 'text-blue-600'}
                             ${selected == 2 && 'border-b-2'}
                             ${selected == 2 && ' dark:border-blue-500 '}
                             ${selected == 2 && 'dark:text-blue-500'}
                             ${selected == 2 && 'border-blue-600'}
                             ${selected !== 2 && 'hover:text-gray-600 '}
                             ${selected !== 2 && 'hover:border-gray-300 '}
                             ${selected !== 2 && 'dark:hover:text-gray-300 '}
                             ${selected !== 2 && 'border-transparent'}
                             `
                        }>
                        <MdContactPhone size={20} className='mr-1'/>
                        Contact Information
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Tabs