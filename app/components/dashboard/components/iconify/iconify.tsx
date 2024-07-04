
'use client';

import { Icon } from '@iconify/react';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------
interface IconifyProps {
  icon: any;
  width?: any;
  sx?: any;
  other?:any;
}

const Iconify: React.FC<IconifyProps> = ({
  icon,width,sx, other}) => (

  <Box
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
  );


export default Iconify;
