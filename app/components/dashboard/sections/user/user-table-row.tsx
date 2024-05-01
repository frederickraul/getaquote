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

// ----------------------------------------------------------------------

interface RowProps {
  data: any;
  selected?:boolean;
  handleClick:(value:any)=>void;
}

const UserTableRow: React.FC<RowProps> = ({
  data,
  selected,
  handleClick
}) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCheckBoxClick = (event:any)=>{
  }

  return (
    <>
      <TableRow 
          hover 
          tabIndex={-1} 
          role="checkbox" 
          selected={selected} 
          style={{cursor:'pointer'}}
          >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected}  />
        </TableCell>

        <TableCell onClick={handleClick}>{data?.vin}</TableCell>

        <TableCell onClick={handleClick}>{data?.make}</TableCell>
        <TableCell onClick={handleClick}>{data?.model}</TableCell>
        <TableCell onClick={handleClick}>{data?.year}</TableCell>
        <TableCell onClick={handleClick}>{data?.engine}</TableCell>

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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
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
