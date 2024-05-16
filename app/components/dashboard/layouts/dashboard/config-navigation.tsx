import { MdOutlinePendingActions } from 'react-icons/md';
import SvgColor from '../../components/svg-color';
import { FcProcess } from 'react-icons/fc';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegTimesCircle } from 'react-icons/fa';
import { TfiReload } from "react-icons/tfi";



// ----------------------------------------------------------------------

const icon = (name:any) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'accepted quotes',
    path: '/dashboard/accepted',
    icon: <IoShieldCheckmarkOutline size={24}/>,
    color: '#14A44D'
  },
  {
    title: 'processing quotes',
    path: '/dashboard/processing',
    icon: <TfiReload size={24}/>,
    color: '#54B4D3'
  },
  {
    title: 'new quotes',
    path: '/dashboard/new',
    icon: <MdOutlinePendingActions size={24}/>,

    color: '#E4A11B'
  },
  {
    title: 'declined quotes',
    path: '/dashboard/declined',
    icon: <FaRegTimesCircle size={24}/>,
    color: '#DC4C64'
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
