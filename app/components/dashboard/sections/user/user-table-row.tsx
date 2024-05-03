import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import LastSeen from './view/LastSeen';


// ----------------------------------------------------------------------

interface RowProps {
  data: any;
  selected?:boolean;
  handleRowClick?:(value:any)=>void;
  handleClick:(value:any)=>void;
  handleDeleteClick:(value:any)=>void;
  handleEditClick:(value:any)=>void;
}

const UserTableRow: React.FC<RowProps> = ({
  data,
  selected,
  handleRowClick,
  handleClick,
  handleDeleteClick,
  handleEditClick,
}) => {
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

        <TableCell onClick={handleRowClick}>{data?.vin}</TableCell>

        <TableCell onClick={handleRowClick}>{data?.make}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.model}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.year}</TableCell>
        <TableCell onClick={handleRowClick}>{data?.engine}</TableCell>
        <TableCell onClick={handleRowClick}><LastSeen date={new Date(data?.createdAt)}/> </TableCell>

        {/* <TableCell align="center">{data?.isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(data?.status === 'banned' && 'error') || 'success'}>{data?.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon={"eva:more-vertical-fill"} />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleEditClick(e);
        }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={(e)=>{
          handleCloseMenu();
          handleDeleteClick(e);
          }}
         sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
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
