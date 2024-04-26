import { useMemo } from 'react';
import { usePathname } from 'next/navigation';


// ----------------------------------------------------------------------

export function usePathName() {
    const pathname = usePathname();


  return useMemo(() => pathname, [pathname]);
}
