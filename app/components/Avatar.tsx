'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src,size }) => {
  return ( 
    <Image 
      className="rounded-full aspect-square" 
      priority={false}
      height={size ? size : 30 } 
      width={size ? size : 30 } 
      alt="Avatar" 
      src={src || '/images/placeholder.jpg'}
    />
   );
}
 
export default Avatar;