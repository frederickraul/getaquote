import { alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';


import Iconify from '../../components/iconify';

import { HEADER } from './config-layout';
import AccountPopover from './common/account-popover';

import { SafeUser } from '@/app/types';

// ----------------------------------------------------------------------

interface HeaderProps {
  currentUser?: SafeUser | null;
  onOpenNav: ()=>void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenNav,currentUser}) => {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      <div className='visible xl:invisible'>
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        </div>

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <NotificationsPopover /> */}
        <AccountPopover currentUser={currentUser} />
      </Stack>
    </>
  );

  return (
    <AppBar
      className=''
      sx={{
        boxShadow: 'none',
        //height: HEADER.H_MOBILE,
        zIndex: 1,
       
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
         // width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
       
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// Header.propTypes = {
//   onOpenNav: PropTypes.func,
// };

export default Header