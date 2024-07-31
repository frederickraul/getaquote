'use client'
import { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LastSeen from '../view/LastSeen';
import { usePathName } from '../../../routes/hooks/usePathName';
import ItemMenu from './itemMenu';
import { TbDotsVertical } from 'react-icons/tb';


// ----------------------------------------------------------------------

interface RowProps {
  fieldOrder?:boolean;
  data: any;
  selected?:boolean;
  handleRowClick?:(value:any)=>void;
  handleClick:(value:any)=>void;
  handleDeleteClick:(value:any)=>void;
  handleEditClick:(value:any)=>void;
  handleOrderClick:(value:any)=>void;
  handleEmailClick:(value:any)=>void;
  handleSendConfirmClick:(value:any)=>void;
  
}

const UserTableRow: React.FC<RowProps> = ({
  fieldOrder,
  data,
  selected,
  handleRowClick,
  handleClick,
  handleDeleteClick,
  handleEditClick,
  handleOrderClick,
  handleEmailClick,
  handleSendConfirmClick,
}) => {

  const pathname = usePathName();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} style={{cursor:'pointer'}}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell onClick={handleRowClick}>
          {pathname == '/dashboard/new' ? data?.city+', '+data?.state + ' '+data?.zip : data?.noOrder}
         </TableCell> 
        <TableCell onClick={handleRowClick}>{data?.year}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.make}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.model}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.engine}</TableCell>
        {/* <TableCell onClick={handleRowClick} style={{textWrap:'nowrap'}}>
          <Typography noWrap className="w-full" fontWeight="fontWeightMedium">
            {data?.phone}
          </Typography>
        </TableCell> */}
        <TableCell className='pr-0 mr-0' onClick={handleRowClick}>
          <div className='w-[75px]'>
          <LastSeen date={data?.createdAt}/> 
          </div>
          </TableCell>
        <TableCell className='w-0 p-0 ml-0'>
          <IconButton onClick={handleOpenMenu}>
            <TbDotsVertical/>
          </IconButton>
        </TableCell>
        <ItemMenu
        open={open}
        handleCloseMenu={handleCloseMenu}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handleEmailClick={handleEmailClick}
        handleSendConfirmClick={handleSendConfirmClick}
        handleOrderClick={handleOrderClick}
      
      />
      </TableRow>
    </>
  );
}

// UserTableRow.propTypes = {
//   avatarUrl: PropTypes.any,
//   company: PropTypes.any,
//   handleClick: PropTypes.func,
//   isVerified: PropTypes.any,
//   name: PropTypes.any,
//   role: PropTypes.any,
//   selected: PropTypes.any,
//   status: PropTypes.string,
// };


export default UserTableRow
