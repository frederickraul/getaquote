'use client'
import { useState } from 'react';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import LastSeen from '../view/LastSeen';
import { usePathName } from '../../../routes/hooks/usePathName';



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
          
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>
        <TableCell onClick={handleRowClick}>{data?.buyerEmail}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.noOrder}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.year} {data?.make} {data?.model}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.vin}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.address}</TableCell>
        <TableCell onClick={handleRowClick} style={{textWrap:'nowrap'}}>
            {data?.phone}
        </TableCell>
        <TableCell onClick={handleRowClick}>{data?.price2}</TableCell>
        <TableCell onClick={handleRowClick} style={{textWrap:'nowrap'}}>
            {<LastSeen date={ data?.createdAt} />}
          </TableCell>

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
