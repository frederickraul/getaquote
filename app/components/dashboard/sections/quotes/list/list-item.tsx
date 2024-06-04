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

import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import LastSeen from '../../quotes/view/LastSeen';
import { usePathName } from '../../../routes/hooks/usePathName';


// ----------------------------------------------------------------------

interface RowProps {
  label:string,
  value:any,
 
  
}

const ListItem: React.FC<RowProps> = ({
  label,
  value,
  
}) => {
  return (
    <div className='flex flex-row'>
        <div className='w-[50%] font-bold text-sm'>{label}</div>
        <div className='w-[50%] text-sm'>{value}</div>
    </div>
  )
}

export default ListItem
