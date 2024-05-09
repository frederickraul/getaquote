'use client';

import Container from  '../../LoadingContainer';
import Logo from './Logo';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

import './styles.css';
import { MdDashboard } from 'react-icons/md';

interface NavbarProps {
    currentUser?: SafeUser | null
    notifications?: any;
}
const Navbar: React.FC<NavbarProps> = ({currentUser, notifications}) => {
  
    const router = useRouter();


  return (
    <div className='fixed w-full bg-white z-10 '>
    <div className=' w-full bg-white shadow-sm '>
        <div>
            <Container>
                <div
                    className='
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3   
                    py-0
                    lg:py-2
                    h-16
                    md:h-20
                        '>
                    <div className='pl-3 lg:pl-0 flex flex-row items-center justify-aroun'>
                    <Logo/>
                    </div>
                    <div className='lg:flex flex-row items-center'>
                      <ul className='nav-ul'>
                          {/* <li>
                            <div className='wrap'>
                              <a> Home</a>
                            </div>
                          </li>
                          <li>
                            <div className='wrap'>
                              <a> Get A Quote </a>
                            </div>
                          </li>
                              <li>
                            <div className='wrap'>
                              <a> Service Areas </a>
                            </div>
                          </li>
                              <li>
                            <div className='wrap'>
                              <a> FAQ </a>
                            </div>
                          </li>
                              <li>
                            <div className='wrap'>
                              <a> About </a>
                            </div>
                          </li> */}
                              <li onClick={()=>{router.push('/dashboard')}}>
                            <div className='wrap mr-5 cursor-pointer'>
                              <MdDashboard className='text-3xl sm:text-4xl md:text-5xl'/>
                            </div>
                          </li>
                         
                      </ul>
                            
                    </div>
             

                </div>
               
            </Container>
        </div>
    </div>
    </div>
  )
}

export default Navbar