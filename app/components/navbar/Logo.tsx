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
        className="md:block cursor-pointer w-[120px] sm:w-[150px] md:w-[200px] lg:w-[200px] "  
        src="/images/ecology-logo.webp"
        onClick={()=>{router.push('/')}} 
        quality={50}
        />
  </a>
  )
}

export default Logo