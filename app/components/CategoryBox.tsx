'use client';

import { IconType } from "react-icons";
import { useRouter,useSearchParams } from 'next/navigation';
import { useCallback } from "react";
import qs from 'query-string';

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
  
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(()=>{
    let currentQuery = {}
    if(params){
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if(params?.get('categoy') === label){
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    },{skipNull: true});

    router.push(url);
  },[label,params, router]);

  return (
    <div 
      onClick={handleClick}
      className={ `
        flex 
        flex-row
        items-center
        justify-center
        border-b-2
        hover:text-neutral-800
        transition-all 
        duration-500
        cursor-pointer whitespace-nowrap
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={12} className="mr-1"/>
      <div className="text-sm">
        {label}
      </div>
    </div>
  )
}

export default CategoryBox