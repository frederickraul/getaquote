import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from '../../../_mock/account';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Iconify from '../../../components/iconify';
import { useRouter } from 'next/navigation';

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
        url: '/dashboard/settings/changepassword'},
      { 
        label: 'Business Contact',
        icon: 'wpf:business-contact',
        url: '/dashboard/settings/businesscontact'},

      ]
  },
];

// ----------------------------------------------------------------------

interface AccountProps {
  currentUser?: SafeUser | null;
}

const AccountPopover: React.FC<AccountProps> = ({
  currentUser }) => {
  const [open, setOpen] = useState(null);

  const router = useRouter();

  const handleOpen = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          
        }}
      >
        <Avatar
          src={currentUser?.image ? currentUser?.image : ''}
          alt={currentUser?.name ? currentUser?.name : ''}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {currentUser?.name ? currentUser?.name.charAt(0).toUpperCase() : ''}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser?.name ? currentUser?.name : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.email ? currentUser?.email : ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <div className='group' key={option.label}>

          <MenuItem  onClick={()=>{router.push(option.url);}}>
            <Iconify icon={option.icon} />
            <span className='mx-2'> {option.label}</span>
            {option?.submenu && <Iconify icon='fe:arrow-right'/>}
          </MenuItem>

               {option.submenu && option.submenu.map((menu) => (           
            <div key={menu.label}  className='
                opacity-0 
                h-0 
                group-hover:opacity-100 
                group-hover:h-10 
                ease-in-out duration-500
                text-neutral-600
                '>
                 <MenuItem onClick={()=>{handleClose(); router.push(menu.url);}}>
                  <Iconify icon={menu.icon} />
                <span className='mx-2'> {menu.label}</span>
                </MenuItem>
            </div>
                ) 
                )}
          </div>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={()=>{signOut()}}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}


export default AccountPopover;