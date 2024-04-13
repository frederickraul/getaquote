import { TbStarFilled } from "react-icons/tb";
import React, { useEffect, useRef } from 'react';

interface BarProps {
  data?: any;
  delay?:number;
  factor?:number;
}

const Bar:React.FC<BarProps> = ({ data, delay, factor }) =>{
  const barRef = useRef(null);

  const heightToString = data.height.toString() + 'px';

  const keyframes = `
    @keyframes appear {
      from {
        opacity: 0;
        height: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  return (
        <div className={` 
        h-full
        w-full
        flex 
        flex-row 
        items-center
        mb-1
        `}> 

          <div className="
            flex 
            flex-row 
            justify-center 
            items-center 
            mr-2 
            text-neutral-500">
              <span className="mr-1">{6-data.id}</span> <TbStarFilled/>
          </div>

          <div
            className={`
              bar 
              w-full
              ${data.color}
              h-5
              `}
            ref={barRef}
            style={{
              opacity: '0',
              animation: 'appear 0.5s ease-out forwards',
              animationDelay: `${delay}ms`,
              animationFillMode: 'forwards',
              animationIterationCount: '1',
              animationName: 'appear',
              animationTimingFunction: 'ease-out',
              position: 'relative',
              width: `${data.height}%`,
            }}
          >

      <style>{keyframes}</style>
    </div>
    

    </div>
  );
}

export default Bar;
