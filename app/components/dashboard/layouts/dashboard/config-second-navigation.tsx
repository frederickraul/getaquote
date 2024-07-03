import { MdOutlinePendingActions } from 'react-icons/md';
import SvgColor from '../../components/svg-color';
import { FcProcess } from 'react-icons/fc';
import { IoMail, IoMailOpenOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegTimesCircle } from 'react-icons/fa';
import { TfiReload } from "react-icons/tfi";
import { HiOutlineDocumentReport } from "react-icons/hi";




// ----------------------------------------------------------------------

const icon = (name:any) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navSecondConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Buyers',
    path: '/dashboard/buyers',
    icon: <IoMailOpenOutline size={24}/>,
    color: '#88888'
  },
  {
    title: 'Report',
    path: '/dashboard/report',
    icon: <HiOutlineDocumentReport size={24}/>,
    color: '#88888'
  },
  
  
];

export default navSecondConfig;
