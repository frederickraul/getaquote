import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { DateRangePicker } from 'react-date-range';
import Field from '../../components/input/Field';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    url: '/dashboard/profile'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    url:'',
    submenu:[
      { label: 'Change Password',
        icon: 'material-symbols:lock-reset',
        url: '/dashboard/settings/changepassword'}
      ]
  },
];

// ----------------------------------------------------------------------

interface AccountProps {
  currentUser?: SafeUser | null;
  selectionRange: any;
  setSelectionRange(range:any): void;

}

const DateRange: React.FC<AccountProps> = ({
  selectionRange, setSelectionRange}) => {
  const [open, setOpen] = useState(null);
  const [startDateFormated, setstartDateFormated] = useState("");
  const [endDateFormated, setendDateFormated] = useState("");

  const router = useRouter();

  const handleOpen = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const startDate = ((selectionRange[0].startDate).toISOString());
    const endDate = ((selectionRange[0].endDate).toISOString());

    setstartDateFormated(startDate.substring(0, 10));
    setendDateFormated(endDate.substring(0, 10));
  }, [selectionRange])
  

  return (
    <>
        <div className='flex flex-row relative'>
          <div className='w-1/2'>
          <Field required disabled type='date' label='Since' value={startDateFormated} onChange={()=>{}}/>
          </div>
         <div className='w-1/2 ml-5'>
         <Field required disabled type='date' label='To' value={endDateFormated} onChange={()=>{}}/>
         </div>
        <div className='h-[60px] absolute w-full'  onClick={handleOpen}>
          
        </div>

        </div>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
       
      >
        <div className='scroll-auto h-[390px]'>

        <DateRangePicker
        className='flex-col-reverse'
        ranges={selectionRange}
        onChange={item=>setSelectionRange([item.selection])}
        />
        </div>
     
      </Popover>
    </>
  );
}


export default DateRange;