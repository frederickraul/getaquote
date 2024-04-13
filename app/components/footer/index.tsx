'use client';

import { User} from '@prisma/client'
import Container from  '../Container';


interface FooterProps {
    currentUser?: User | null
}
const Footer: React.FC<FooterProps> = ({currentUser}) => {
  return (
    <div 
      className="
        bg-black absolute bottom-0 w-[100%]
        ">
                <div className="text-gray-100 container mx-auto px-6 pt-10 pb-6 max-w-[960px] flex flex-col items-center" >
                <a href="https://ecologycashforcars.com/" target='_blank'>
                  <span className='mt-2'>Copyright © 2017-2024 Ecology Cash For Cars - All Rights Reserved.

</span>
                </a>
        </div>
            </div>
  )
}

export default Footer