'use client'

import { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Nav from './nav';
import Main from './main';
import Header from './header';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';


// ----------------------------------------------------------------------
interface ScrollbarProps{
  currentUser?: SafeUser | null;
  session?:any;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<ScrollbarProps> = ({
  children,currentUser,session}) => {


  const sessionToken = session?.user?.token;
  const token = currentUser?.token;

  const [openNav, setOpenNav] = useState(false);
  const [invertColor, setInvertColor] = useState(false);

  const handleInvertColor = () => {
    setInvertColor(!invertColor);
    if(invertColor) sessionStorage.setItem('invertColor', 'false');
    if(!invertColor)sessionStorage.setItem('invertColor', 'true');
  }

  useLayoutEffect(() => {
    if (sessionStorage.getItem('invertColor')) {
      const value = (sessionStorage.getItem('invertColor'));
      if(value == "true"){
        setInvertColor(true);
      }else{
        setInvertColor(false);
      }
    }
  }, []);

  useEffect(() => {
    if(sessionToken != token){
      console.log('signOut');
      signOut();
    }
  }, [currentUser]);
  



  return (
    <div className={`${invertColor && 'invert'} md:h-[100%] md:max-h-[100%] max-h-screen min-h-screen overflow-hidden md:overflow-auto`}>
      <Header setInvertColor={handleInvertColor} currentUser={currentUser}  onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav currentUser={currentUser} openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>

          {children}
          </Main>
      </Box>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;