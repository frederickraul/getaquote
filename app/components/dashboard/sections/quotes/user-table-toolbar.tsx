import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../../components/iconify';
import { usePathName } from '../../routes/hooks/usePathName';

// ----------------------------------------------------------------------


interface ToolbarProps {
  numSelected: any;
  filterName?:string;
  onFilterName:(value:any)=>void;
  onDelete:(value:any)=>void;
  onChangeStatus:(value:any)=>void;
}

const UserTableToolbar: React.FC<ToolbarProps> = ({
  numSelected,
  filterName,
  onFilterName,
  onDelete,
  onChangeStatus,

}) => {

  const pathname = usePathName();

  return (
    <Toolbar
    className='white'
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
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
          value={filterName}
          onChange={onFilterName}
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

{numSelected > 0 && (
  <div className='flex flex-row items-center'>
    <div className='mr-5'>
        <span className='mr-5 text-neutral-600 '>Move to</span>
        { pathname == '/dashboard/declined' &&

        <Tooltip title="New" onClick={()=>{onChangeStatus('pending')}}>
          <IconButton>
            <Iconify icon="material-symbols:pending-actions" width={34} />
          </IconButton>
        </Tooltip>
        }
        { (pathname == '/dashboard/declined' || pathname == '/dashboard/processing') &&
        <Tooltip title="Accepted" onClick={()=>{onChangeStatus('accepted')}}>
          <IconButton>
            <Iconify icon="pepicons-pop:shield-check" width={30} />
          </IconButton>
        </Tooltip>
        }
        { (pathname == '/dashboard/accepted' || pathname == '/dashboard/processing') &&
        <Tooltip title="Declined" onClick={()=>{onChangeStatus('declined')}}>
          <IconButton>
            <Iconify icon="pepicons-pop:times-circle-filled" width={26} />
          </IconButton>
        </Tooltip>
        }
    </div>
       
        
        <Tooltip title="Delete" onClick={onDelete}>
          <IconButton>
            <Iconify icon="pepicons-pop:trash" width={28} />
          </IconButton>
        </Tooltip>
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


export default  UserTableToolbar