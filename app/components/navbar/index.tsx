'use client';

import { User} from '@prisma/client'
import Container from  '../Container';
import Logo from './Logo';
import Search from './Search';
import { UserMenu } from './UserMenu';
import Categories from './Categories';
import { SafeUser } from '@/app/types';
import { IoIosPin } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Notificacion from '../notification';
import { useCallback, useEffect, useState } from 'react';
import Messages from '../messages';
import axios from 'axios';
import Button from '../Button';
import './styles.css';

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
                    md:gap-0
                    py-4
                        '>
                    <div className='flex flex-row items-center justify-around'>
                    <Logo/>
                    </div>
                    <div className='lg:flex flex-row items-center hidden'>
                      <ul className='nav-ul'>
                          <li>
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
                          </li>
                              <li>
                            <div className='wrap'>
                              <a> Contact </a>
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