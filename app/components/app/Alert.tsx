import React from 'react'
import Button from './Button';


interface AlertProps { 
    action:() => void;
  }
  const Alert: React.FC<AlertProps> = ({
    action
  })=>{
    return (
        <div id="alert-border-3" className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ml-3 font-medium">
                There are new changes on your listing that require you atention.
            </div>

            <div className="ml-auto w-[150px] flex">
                <Button  
                    color='bg-transparent' 
                    styles='bg-transparent border-blue-500 text-blue-500' 
                    outline 
                    label='Apply' 
                    onClick={action}/>
            </div>
        </div>
    )
}

export default Alert