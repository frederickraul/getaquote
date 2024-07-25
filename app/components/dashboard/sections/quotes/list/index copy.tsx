'use client'
import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Checkbox, IconButton } from "@mui/material";
import { AutoSizer } from "react-virtualized";
import Iconify from "../../../components/iconify";
import ItemMenu from "../../quotes/table/itemMenu";
import ListNoData from "./list-no-data";

interface RowProps {
  notFound:boolean;
  fieldOrder?: boolean;
  data: any;
  selected: any;
  setSelected: (value: any) => void;
  handleCheckboxClick: (event:any,value2:any)=>void;
  handleRowClick:(event:any,value2:any)=>void;
  handleEditClick:(event:any,value2:any)=>void;
  handleDeleteClick:(event:any,value2:any)=>void;
  handleOrderClick:(event:any,value2:any)=>void;
  handleSendClick:(event:any,value2:any)=>void;
  handleSendConfirmClick:(event:any,value2:any)=>void;
  onBatchDelete:()=>void;
  onBatchChangeStatus:(status:string)=>void;

}

const QuoteList: React.FC<RowProps> = ({
  notFound,
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


  const Row = React.useCallback(
    ({ index } : {index:any}) => {
     const isLastItem = data?.length -1 === index;
   
 
      const rowId = data[index]?.id;
      const row = data[index];
      const checked =  selected?.indexOf(rowId) !== -1;
      return (
        <div 
          key={index} 
          className={`mx-2 
                      py-1 
                      ${isLastItem && 'pb-32'}
                      `}>
          <div className='
            p-4
            border-2
            rounded-lg
            shadow
            bg-white
        '>
            <div className='flex flex-row justify-between'>
              <div className='flex items-center z-50'>
                <div className="-ml-2">
                <Checkbox 
                  className="p-0 m-0"
                  disableRipple 
                  checked={checked} 
                  onChange={(event) => {handleCheckboxClick(event, rowId)}} />
                </div>
                <a className='text-blue-500 font-bold ml-0' href='#'>#{data[index]?.noOrder ? data[index]?.noOrder : 'N/A'}</a>
              </div>

              <div className='
                text-xs 
                flex
                flex-row 
                justify-start                
                items-start
                ' 
                onClick={()=>{handleRowClick(event, data[index])}}
                >
       
                <div className='ml-2 relative'>
                  <IconButton className='m-0 p-0' onClick={(e)=>{openMenu(e);setRow(row)}}>
                    <Iconify icon={"eva:more-vertical-fill"} />
                  </IconButton>

                </div>
              </div>
            </div>
            <div className='flex flex-col mt-2 gap-1' onClick={()=>{handleRowClick(event, data[index])}}
>
              <span className=''>{data[index]?.year + ' ' +data[index]?.make + ' '+ data[index]?.model}</span>
              <span className='text-gray-700'>{data[index]?.engine} </span>
              <span className='font-bold'>{data[index]?.phone} </span>
              <div style={{ height: `${data[index]?.randomHeight}px` }} />
            </div>
          </div>
         
        </div>
      )
    },
    [openMenu, selected,data]
  );

  if(notFound){
    return <ListNoData/>
  }

  return (
    <div className="h-[70vh] md:hidden">
       <ItemMenu
          open={anchorEl}
          handleCloseMenu={handleClose}
          handleEditClick={(event) => handleEditClick(event, row)}
          handleDeleteClick={(event) => handleDeleteClick(event, row)}
          handleOrderClick={(event) => handleOrderClick(event, row)}
          handleEmailClick={(event) => handleSendClick(event, row)}
          handleSendConfirmClick={(event) => handleSendConfirmClick(event, row)}
      />
      <AutoSizer>
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

export default QuoteList;
