
'use client';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../../../components/iconify';
import { usePathName } from '../../../routes/hooks/usePathName';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { FaSearch } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import ModalConfirm from '../modal/ModalConfirm';
import { useState } from 'react';



// ----------------------------------------------------------------------


interface ToolbarProps {
  numSelected: any;
  filterName?: string;
  onFilterName: (value: any) => void;
  onDelete: () => void;
  onChangeStatus: (value: any) => void;
  onBatchSendEmail: (value:any) => void;
}

const QuoteTableToolbar: React.FC<ToolbarProps> = ({
  numSelected,
  filterName,
  onFilterName,
  onDelete,
  onChangeStatus,
  onBatchSendEmail

}) => {

  const pathname = usePathName();
  const [isConfirmVisible, setisConfirmVisible] = useState(false);

  const handleConfirmModalClose = () => {
    setisConfirmVisible(false);
  }

  const handleClickDelete = () =>{
    setisConfirmVisible(true);
  }

  const handleBatchDelete = () => {
    setisConfirmVisible(false);
    onDelete();
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
        '
      sx={{
        height: 96,
        ...(numSelected > 0 && {
          color: 'primary.main',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          className='w-full md:w-fit'
          value={filterName}
          onChange={onFilterName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <IoSearch size={20} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <div className='flex flex-row w-full sm:w-auto  justify-between md:justify-end'>
          {pathname == '/dashboard/new' &&
            <div className='sm:mr-5 pr-5 sm:pr-16  flex flex-row items-center justify-between'>
              <span className='mr-5 text-neutral-600 '>Send</span>
              <div className='flex flex-row'>

                <Tooltip title="Multiple Emails" onClick={() => { onBatchSendEmail({id:0}) }}>
                  <IconButton>
                    <Iconify icon="mdi:email-multiple" width={25} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          }
          <div className='sm:mr-5 flex flex-row items-center justify-between'>
            <span className='mr-5 text-neutral-600 '>Move to</span>
            <div className='flex flex-row'>

              {pathname == '/dashboard/declined' &&

                <Tooltip title="Pending" onClick={() => { onChangeStatus('pending') }}>
                  <IconButton>
                    <Iconify icon="material-symbols:pending-actions" width={34} />
                  </IconButton>
                </Tooltip>
              }
              {(pathname == '/dashboard/declined' || pathname == '/dashboard/processing') &&
                <Tooltip title="Accepted" onClick={() => { onChangeStatus('accepted') }}>
                  <IconButton>
                    <Iconify icon="pepicons-pop:shield-check" width={30} />
                  </IconButton>
                </Tooltip>
              }
              {(pathname == '/dashboard/accepted' || pathname == '/dashboard/processing') &&
                <Tooltip title="Declined" onClick={() => { onChangeStatus('declined') }}>
                  <IconButton>
                    <Iconify icon="pepicons-pop:times-circle-filled" width={26} />
                  </IconButton>
                </Tooltip>
              }

              <Tooltip title="Delete" onClick={handleClickDelete}>
                <IconButton>
                  <Iconify icon="pepicons-pop:trash" width={28} />
                </IconButton>
              </Tooltip>

              <ModalConfirm
                message='Are you sure you want to delete all the selected quotes?'
                visible={isConfirmVisible}
                onClose={handleConfirmModalClose}
                action={handleBatchDelete} />
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


export default QuoteTableToolbar