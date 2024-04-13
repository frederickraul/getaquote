'use client';

import React from 'react';
import Container from '../Container';
import { usePathname,useSearchParams } from 'next/navigation';

import { TbBeach, TbMedicineSyrup, TbMountain, TbSeeding } from 'react-icons/tb';
import { GiBarStool, GiDeliveryDrone, GiDoctorFace, GiGraveFlowers, GiMedicinePills, GiWaterFountain, GiWindmill } from 'react-icons/gi';
import {  MdOutlineVilla, MdRestaurant, MdWarehouse } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { BiBus } from 'react-icons/bi';

export const categories = [
  {
    label: 'Growers',
    icon: GiGraveFlowers,
    value:'Growers'
  },
  {
    label: 'Delivery',
    icon: GiDeliveryDrone,
    value:'Delivery'
  },
  {
    label: 'Dispensaries',
    icon: MdWarehouse,
    value:'Dispensaries'
  },
  {
    label: 'Hydroponics',
    icon: GiWaterFountain,
    value:'Hydroponics'
  },
  {
    label: 'Doctors',
    icon: TbMedicineSyrup,
    value:'Doctors'
  },
  {
    label: 'Vendors',
    icon: MdOutlineVilla,
    value:'Vendors'
  },
  {
    label: 'Bus Tours',
    icon: BiBus,
    value:'Bus Tours'
  },
  {
    label: 'Restaurant',
    icon: MdRestaurant,
    value:'Restaurant'
  },
  {
    label: 'Bars',
    icon: GiBarStool,
    value:'Bars'
  },
  {
    label: 'Lounge',
    icon: TbMountain,
    value:'Lounge'
  },
  {
    label: 'Seeds',
    icon: TbSeeding,
    value:'Seeds'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }



  return (
    <Container>
      <div className='
        pt-4
        flex
        flex-row
        items-center
        justify-between overflow-x-auto
        max-w-max
        gap-2
      '>
        {categories.map((item)=> (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}

      </div>
    </Container>
  )
}

export default Categories