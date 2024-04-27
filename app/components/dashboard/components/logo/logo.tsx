import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';


// ----------------------------------------------------------------------
interface LogoProps {
  disabledLink?: boolean;
  sx?: any;
  other?: any;


}

const Logo: React.FC<LogoProps> = ({
  disabledLink,sx,other}) => {

  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const router = useRouter();

  const logo = (
    <Box
      component="img"
      src='/images/ecology-logo.webp'
      sx={{
        width: 150,
        height: 45,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <div className='cursor-pointer' onClick={()=>{router.push('/')}}>
      {logo}
    </div>
  );
}



export default Logo;
