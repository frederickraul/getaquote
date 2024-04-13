'use client';

import { useEffect, useState } from 'react';
import '../../notification.scss';
import useNotification from '../../hooks/useNotifications';
import { SafeUser } from '../../types';
import BellIcon from './BellIcon';


// const soundUrl = `https://ia800203.us.archive.org/14/items/slack_sfx/been_tree.mp3`;

interface NotificationButtonProps {
  onClick: () => void;
  style?: String;
  link?: string;
  count: number;
  currentUser?: any | null
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  style,
  onClick,
  link,
  count,
  currentUser
}) => {

    const [isAnimating, setIsAnimating] = useState(false);


    const handleOn = () => setInterval(()=> setIsAnimating(!isAnimating), 5000);
    

   // handleOn();


   useEffect(() => {
      if(count > 0){
        handleOn();
      }

   }, [count])


const Notification = () => (
    <div
      className={`notification-bell cursor-pointer ${isAnimating ? 'is-animating' : ''}`}
      data-count={ count > 9 ? '9+' : count }>
      <BellIcon />
    </div>
  )
  

  return (
    <div onClick={onClick}>
    <Notification/>
  </div>
  )
}

export default NotificationButton



