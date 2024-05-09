import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';

import Box from '@mui/material/Box';

import { StyledScrollbar, StyledRootScrollbar } from './styles';

// ----------------------------------------------------------------------
interface ScrollbarProps{
  children: React.ReactNode;
  styles?: any;
  other?:any;
}

const Scrollbar: React.FC<ScrollbarProps> = ({
  children,styles,other}) => {

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  

//   return (
//     <StyledRootScrollbar className='px-5 bg-none'>
//       <StyledScrollbar
//         clickOnTrack={false}
//         sx={sx}
//         {...other}
//       >
//         {children}
//       </StyledScrollbar>
//     </StyledRootScrollbar>
//   );
// };

  return (
    <div className={`
        px-5 
        h-[100%] 
        overflow-auto 
        lg:overflow-hidden 
        flex-grow 
        grid-rows-1
        ${styles && styles}
        `}>
      <div className='h-max[100%]'>
        {children}
      </div>
      </div>
  );
};



export default memo(Scrollbar);
