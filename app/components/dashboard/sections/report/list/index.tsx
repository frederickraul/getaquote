'use client'
import React, {  useState } from "react";
import { FixedSizeList as List } from "react-window";
import {  Checkbox, IconButton } from "@mui/material";
import { AutoSizer } from "react-virtualized";
import Iconify from "../../../components/iconify";
import ItemMenu from "../../quotes/table/itemMenu";
import ListNoData from "./list-no-data";
import LastSeen from "../view/LastSeen";

interface RowProps {
  notFound:boolean;
  fieldOrder?: boolean;
  data: any;
  filterName?:string;
  selected: any;
  setSelected: (value: any) => void;
  handleCheckboxClick: (event:any,value2:any)=>void;
  handleRowClick:(event:any,value2:any)=>void;
  handleEditClick:(event:any,value2:any)=>void;
  handleDeleteClick:(event:any,value2:any)=>void;
  handleOrderClick:(event:any,value2:any)=>void;
  handleSendClick:(event:any,value2:any)=>void;
  handleSendConfirmClick:(event:any,value2:any)=>void;
  onBatchDelete?:()=>void;
  onBatchChangeStatus?:(status:string)=>void;
  

}

const BuyerList: React.FC<RowProps> = ({
  notFound,
  filterName,
  fieldOrder,
  data,
  selected,
  setSelected,
  handleCheckboxClick,
  handleRowClick,
  handleDeleteClick,
  handleEditClick,
  handleOrderClick,
  handleSendClick,
  handleSendConfirmClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [row, setRow] = useState();

  const openMenu = React.useCallback((e:any) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n:any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  let tableHeader = [
    { id: 'email', label: 'Email' },
    { id: 'ref', label: 'Ref#' },
    { id: 'vehicle', label: 'Vehicle' },
    { id: 'vin', label: 'Vin Number' },
    { id: 'address', label: 'Address' },
    { id: 'phone', label: 'Phone' },
    { id: 'commision', label: 'Commision' },
    { id: 'updatedAt', label: 'Date' },
   
  ];



  const Row = React.useCallback(
    ({ index } : {index:any}) => {
      const rowId = data[index]?.id;
      const row = data[index];

      const checked =  selected?.indexOf(rowId) !== -1;
      return (
        <div 
          key={index} 
          className='
            mx-2
            py-1 
          '          >
          <div className='
            p-4
            border-2
            rounded-lg
            shadow
            bg-white
        '>
            <div className='flex flex-row justify-between'>
              <div className='flex items-center z-50'>
              <span className='text-gray-700'>#{row?.noOrder}</span>

              </div>

              <div className='
                text-xs 
                flex
                flex-row 
                justify-start                
                items-start
                ' 
                onClick={()=>{handleRowClick(event, row)}}
                >
       
                <div className='ml-2 relative'>
                  <IconButton className='m-0 p-0' onClick={(e)=>{openMenu(e);setRow(row)}}>
                    <Iconify icon={"eva:more-vertical-fill"} />
                  </IconButton>

                </div>
              </div>
            </div>
            <div className='flex flex-col mt-2 gap-1' onClick={()=>{handleRowClick(event, row)}}
>             <a className='text-blue-500 font-bold' href='#'>{row?.buyerEmail}</a>

              <span className='font-bold'>{row?.year} {row?.make} {row?.model}</span>
              <span className=''>{row?.phone}</span>
              <span className='font-normal'> {<LastSeen date={ row?.createdAt} />}</span>
              

              <div style={{ height: `${row?.randomHeight}px` }} />
            </div>
          </div>
         
        </div>
      )
    },
    [openMenu, selected,data]
  );

  if(notFound){
    return <ListNoData query={filterName} />
  }

  return (
    <div className="h-[70vh] md:hidden">
      <div className="pl-3 sm:pl-5 bg-white">
      <Checkbox
            indeterminate={ selected.length > 0 && selected.length < data.length}
            checked={data.length > 0 && selected.length === data.length}
            onChange={handleSelectAllClick}
          />
          Select all
      </div>
       <ItemMenu
          open={anchorEl}
          handleCloseMenu={handleClose}
          handleEditClick={(event) => handleEditClick(event, row)}
          handleDeleteClick={(event) => handleDeleteClick(event, row)}
          handleOrderClick={(event) => handleOrderClick(event, row)}
          handleEmailClick={(event) => handleSendClick(event, row)}
          handleSendConfirmClick={(event) => handleSendConfirmClick(event, row)}
      />
      <AutoSizer className=''>
        {
          ({ width, height }) => {
            return (

              <List className=''
                height={height}
                width={width}
                itemSize={120}
                itemCount={data?.length}
              >
                {Row}
              </List>
            )
          }
        }
      </AutoSizer>
    </div>
  );
}

export default BuyerList;
