import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';


// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   toggle: {
//     fontFamily: `'Raleway', sans-serif`,
//     fontSize: '.8rem',
//     border: '1px solid rgba(0, 0, 0, 0.12)',
//     borderRadius: '10px',
//     '&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
//       borderRadius: '10px',
//     },
//     '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
//       borderRadius: '10px',
//       border: '1px solid rgba(0, 0, 0, 0.12)',
//     },
//     '&.Mui-selected': {
//       borderRadius: '10px',
//       background: '#000',
//       color: '#fff',
//     },
//     '&.MuiToggleButton-root': {
//       '&:hover': {
//         background: '#000',
//         color: '#fff',
//       },
//     },
//   },
// });

interface FilterListProps {
  options: any;
  value: number;
  selectToggle:(value: any)=> void;
  stars?: boolean;
   
}


const FilterListToggle : React.FC<FilterListProps> = ({
  options,
  value,
  selectToggle,
  stars
}) => {
  // const classes = useStyles();
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={selectToggle}
      className={`justify-around w-full flex flex-wrap-reverse gap-1`}
    >
      {options.map((option:any) => (
        <ToggleButton 
        className='' 
        key={option.id} value={option.value}>
          {option.label} {stars && (<AiFillStar size={16} className='text-yellow-500'/>) }
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FilterListToggle;
