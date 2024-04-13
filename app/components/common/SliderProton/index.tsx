import { Slider } from '@mui/material';
import React from 'react';


// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   thumb: {
//     color: '#000',
//   },
//   rail: {
//     color: `rgba(0, 0, 0, 0.26)`,
//   },
//   track: {
//     
//   },
// });

interface SliderProtonProps {
  changePrice: any;
  value: any; 
}


const SliderProton:React.FC<SliderProtonProps> = ({ value, changePrice }) => {
  // const classes = useStyles();

  return (
    <div className={`w-full`}
    >
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay='on'
        min={1000}
        max={5000}
        classes={{
           thumb: 'text-black',
           rail: `bg-black opacity-25`,
           track: 'text-black',
        }}
      />
    </div>
  );
};

export default SliderProton;
