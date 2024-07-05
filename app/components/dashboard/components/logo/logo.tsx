import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
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
    <div className='flex mt-6 items-center justify-center w-full'>
      <Image alt='' src='/assets/logo.svg' width={200} height={20}/>
    </div>
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
