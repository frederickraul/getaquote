'use client'

import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { SafeUser } from '@/app/types';

// ----------------------------------------------------------------------
interface ScrollbarProps{
  currentUser?: SafeUser | null;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<ScrollbarProps> = ({
  children,currentUser}) => {

  const [openNav, setOpenNav] = useState(false);

  return (
    <div>
      <Header currentUser={currentUser}  onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav currentUser={currentUser} openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;