'use client';

import React, { useEffect, useRef, useState } from 'react';

import './styles.css';
import { categoryList, ratingList } from '@/app/const';
import FilterListToggle from '@/app/components/common/FilterListToggle';
import CheckboxProton from '@/app/components/common/CheckboxProton';
import SliderProton from '@/app/components/common/SliderProton';
import Button from '@/app/components/Button';
import { BiTime } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

interface ListingClientProps {
  selectedCategory?: any;
  selectCategory?: any;
  selectedRating?: any;
  selectedPrice?: any;
  selectRating?: any;
  cuisines?: any;
  changeChecked?: any;
  changePrice?: any;
  isVisible: boolean;
  closeFilterPane: any;
   
}



const FilterPanel: React.FC<ListingClientProps> = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedPrice,
  selectRating,
  cuisines,
  changeChecked,
  changePrice,
  isVisible,
  closeFilterPane,
}) => {
  const filterPanel = useRef<HTMLInputElement>(null);
  const [panelStatus, setPanelStatus] = useState(false);
useEffect(() => {
  setPanelStatus(isVisible);
}, [isVisible]);

useEffect(() => {
    window.addEventListener("mousedown", handleOutSideClick);
    
}, [filterPanel]);

const handleOutSideClick = (event: any) => {
    
      if (!filterPanel.current?.contains(event.target)) {
        
        closeFilterPane();
      }
    };

  return(
    <div ref={filterPanel}className={`
      ${isVisible? 'block' : 'hidden'}
      fixed z-10
      md:absolute
      h-full
      sm:h-auto 
      w-full
      sm:w-[300px]
      left-0
      sm:left-10 
      top-0
      sm:top-10 
      mt-0
      sm:mt-20 
      p-5 
      shadow-xl 
      border-[1px] 
      bg-white
      `}>
    <div className='relative w-full'>
      <div className='absolute right-1 top-0 z-10 cursor-pointer hover:scale-110 transition text-neutral-600 -top' onClick={closeFilterPane}>
      <AiOutlineClose size={20}/>
      </div>
    </div>
    <div className='input-group w-m'>
      <p className='label'>Category</p>
      <FilterListToggle
        options={categoryList}
        value={selectedCategory}
        selectToggle={selectCategory}
      />
    </div>
    <div className='input-group'>
      <p className='label'>Imported</p>
      {cuisines.map((cuisine:any) => (
        <CheckboxProton
          key={cuisine.id}
          cuisine={cuisine}
          changeChecked={changeChecked}
        />
      ))}
    </div>
    <div className='input-group'>
      <p className='label-range'>Price Range</p>
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>
    <div className='input-group'>
      <p className='label'>Star Rating</p>
      <FilterListToggle
        stars
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
    <div className='input-group'>
        <Button
             outline
             label="Remove all filters"
             onClick={()=>{
              selectCategory(null,'all');
              changePrice(null,'all');
              changeChecked('all');
              selectRating(null,'all');
             }}
          />
    </div>
  </div>
  )

  
  
      };

export default FilterPanel;
