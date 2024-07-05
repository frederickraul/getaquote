import PropTypes from 'prop-types';

import { useResponsive } from '../../hooks/use-responsive';

// ----------------------------------------------------------------------

const SPACING = 8;
interface ScrollbarProps{
  children: React.ReactNode;
  sx?: any;
  other?:any;
}

const Main: React.FC<ScrollbarProps> = ({
  children,sx,other}) => {

  const lgUp = useResponsive('up', 'lg');

  return (
    <div className='flex flex-col flex-grow min-h-1 py-24'
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      {children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};


export default Main;