
'use client';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


import Iconify from '../../../components/iconify';
import { usePathName } from '../../../routes/hooks/usePathName';

import Select from '../view/Select';
import Field from '../../../components/input/Field';
import Input from '@/app/components/app/inputs/Input';
import InputUnregistered from '@/app/components/app/inputs/InputUnregistered';
import { useState } from 'react';
import { addDays } from 'date-fns';
import DateRange from '../DateRange';

// ----------------------------------------------------------------------


interface ToolbarProps {
  buyerList: any;
  handleInput:(field:any,value:any)=>void;
  selectionRange:any;
  setSelectionRange(range:any):void;
  numSelected: any;
  filterName?:string;
  filterDate?:any;
  since?:string;
  to?:string;
  onFilterName:(value:any)=>void;
  onDelete:(value:any)=>void;
  onAddModalClick:()=>void;
  onExportExcel:()=>void;
  onChangeStatus?:(value:any)=>void;
}



const ReportTableToolbar: React.FC<ToolbarProps> = ({
  buyerList,
  selectionRange,
  setSelectionRange,
  handleInput,
  numSelected,
  filterName,
  filterDate,
  onFilterName,
  onExportExcel,
  onDelete,
  onChangeStatus,
  onAddModalClick,

}) => {

  
  const pathname = usePathName();

  
  const handleSelect =(ranges:any)=>{
    setSelectionRange(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }



  return (
    <Toolbar
    className='
        bg-white
        rounded-t-lg 
        justify-center 
        items-start
        sm:items-center 
        sm:justify-between 
        flex 
        flex-col-reverse 
        sm:flex-row
        h-[150px]
        md:h-[96px]
        '

    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <div className='flex flex-col md:flex-row justify-between w-full'>
         <div className='md:w-1/4'>
         <Select
                        label="Bill To"
                        value={filterName}
                        options={buyerList}
                        onChange={(e)=>{onFilterName(e)}} 
                      />
         </div>

        <div className='relative ml-0 md:ml-2 bg-white z-10'>
         
          <div className='relative md:absolute right-0'>
            <DateRange selectionRange={selectionRange} setSelectionRange={handleSelect}/>
          </div>
        </div>
        </div>
      )}

{numSelected > 0 && (
  <div className='flex flex-row w-full sm:w-auto justify-end'>
    <div className='sm:mr-5 flex flex-row items-center justify-between'>
        <span className='mr-5 text-neutral-600 '>Export to</span>
        <div className='flex flex-row'>

          <Tooltip title="Export to Excel" onClick={onExportExcel}>
          <IconButton>
            <Iconify icon="vscode-icons:file-type-excel" width={28} />
          </IconButton>
        </Tooltip>
          </div>
    </div>
       
        
       
  </div>
      )}
    </Toolbar>
  );
}

// UserTableToolbar.propTypes = {
//   numSelected: PropTypes.number,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
// };


export default  ReportTableToolbar