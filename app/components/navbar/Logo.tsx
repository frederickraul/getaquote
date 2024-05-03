'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

  return (
    <a onClick={(e)=>e.preventDefault()} href="/">
    <Image
        priority={false} 
        sizes="100"
        height={60}
        width={240}
        alt="Logo"
        className="md:block cursor-pointer w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] "  
        src="/assets/logo.svg"
        onClick={()=>{router.push('/')}} 
        quality={50}
        />
  </a>
  )
}

export default Logo