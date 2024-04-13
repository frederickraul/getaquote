import React, { useEffect, useState } from 'react';
import Bar from './Bar';

interface BarRatingProps {
  data?: any;
  factor?:number;
}
const BarRating:React.FC<BarRatingProps> = ({ data, factor}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="bar-container" className='flex flex-col items-center relative w-full'>

      {data.map((barData:any, index:number) =>
        shouldRender ? (
          <Bar key={index} data={barData} delay={index * 300} factor={factor}/>
        ) : null
      )}
              {/* <div className='h-10 w-[80%] bg-neutral-700 absolute bottom-12 -z-10'></div> */}

    </div>
  );
};

export default BarRating;