'use client'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// import { usePathname } from '../../routes/hooks';
// import { RouterLink } from '../../routes/components';

import { useResponsive } from '../../hooks/use-responsive';

import { account } from '../../_mock/account';

import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { usePathName } from '../../routes/hooks/usePathName';
import navSecondConfig from './config-second-navigation';
import { SafeUser } from '@/app/types';
// import { useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

interface NavProps {
  currentUser?: SafeUser | null;
  openNav?: any;
  onCloseNav?: any;


}

const Nav: React.FC<NavProps> = ({
  openNav, onCloseNav, currentUser }) => {



  const upLg = useResponsive('up', 'lg');

  // useEffect(() => {
  //   if (openNav) {
  //     onCloseNav();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={currentUser?.image ? currentUser?.image : ''} alt={currentUser?.name ? currentUser?.name : ''}>
      {currentUser?.name ? currentUser?.name.charAt(0).toUpperCase() : ''}
        </Avatar>

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{currentUser?.name ? currentUser?.name : ''}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account?.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderSecondMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navSecondConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

 

  const renderContent = (
    <Scrollbar
    styles='bg-white'
    >
      <Logo  />

      {renderAccount}

      {renderMenu}
      <hr className='my-3'/>
      {renderSecondMenu}

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {/* {renderUpgrade} */}
    </Scrollbar>
  );

  return (
    <div className='xl:w-[280px] z-10'>
     <div className='invisible xl:visible'>
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
          >
          {renderContent}
        </Box>
      </div>
      <div className='visible xl:hidden'>
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      </div>
    </div>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem(element:any) {
  const pathname = usePathName();
  const {item} = element;
  return (
    <ListItemButton
      //component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...((item.path === pathname) && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }} style={{color:item.color}}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};


export default Nav;