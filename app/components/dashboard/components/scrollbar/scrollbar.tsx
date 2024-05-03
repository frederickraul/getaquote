import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';

import Box from '@mui/material/Box';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------
interface ScrollbarProps{
  children: React.ReactNode;
  sx?: any;
  other?:any;
}

const Scrollbar: React.FC<ScrollbarProps> = ({
  children,sx,other}) => {

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);


  return (
    <div className='h-[100%] overflow-auto lg:overflow-hidden flex-grow grid-rows-1'>
      <div className='h-max[100%]'>
        {children}
      </div>
      </div>
  );
};



export default memo(Scrollbar);
