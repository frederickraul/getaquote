'use client';

import React from 'react';
import ListItem from './ListItem';
import './styles.css';
import { AiFillFilter } from 'react-icons/ai';
import FloatingButton from '@/app/components/FloatingButton';
import { MdFilterList } from 'react-icons/md';
import { addProduct } from '@/app/const';
import AddButton from '@/app/components/AddButton';
import { SafeProduct, SafeUser } from '@/app/types';
import ConfirmModal from '@/app/components/modals/ConfirmModal';

interface ListProps {
  currentUser?: SafeUser | null;
  list: SafeProduct[];
  action:() =>void;
  secondAction?:(item:any) =>void;
  openConfirmModal?:(id:string) =>void;
  onDeleteAction?:(id:string) =>void;
  items?: number;
  small?:boolean;
  isLoading:() => void;
  edit?:boolean;
  isOwner?: boolean;
}
const List: React.FC<ListProps> = ({
  list,
  items,
  small,
  isLoading,
  edit,
  action,
  secondAction,
  openConfirmModal,
  currentUser,
  isOwner
}) => (
  <>
      {/* ${items == 5 ? 'flex flex-row w-[500px] sm:w-full sm:grid sm:grid-cols-5 overflow-x-scroll' : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} */}
<div className='px-5 w-full overflow-x-auto sm:overflow-hidden'>

  <div className={`
    pt-4
    ${items == 5 ? 'grid grid-cols-5 min-w-[700px] ' : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"}
    gap-8
    mb-10
    `}>
      {edit &&
          <AddButton title='ADD PRODUCT' item={addProduct} key={addProduct.id} isLoading={isLoading} action={action}/>
      }
    {list.map((item:any) => (
      <ListItem 
          small={small} 
          key={item.id} 
          item={item} 
          isLoading={isLoading} 
          edit={edit} 
          onEditAction={secondAction} 
          openConfirmModal={openConfirmModal}
          currentUser={currentUser}
          isOwner={isOwner}
          />
      ))}
      

  </div>
  </div>
      </>
);

export default List;
