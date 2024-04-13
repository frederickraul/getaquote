import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

// const useStyles = makeStyles({
//   root: {
//     '&$checked': {
//       color: '#000',
//     },
//   },
//   checked: {},
//   wrap: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row-reverse',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginLeft: 0,
//   },
//   label: {
//     fontSize: '.8rem',
//     fontFamily: `'Raleway', sans-serif`,
//   },
// });

interface CheckboxProtonProps {
  changeChecked:(id:String) => void;
  cuisine: any; 
}


const CheckboxProton : React.FC<CheckboxProtonProps> = ({ changeChecked, cuisine }) => {
  // const classes = useStyles();
  const { checked, label, id } = cuisine;
  return (
    <div>
      <FormControlLabel
        classes={{
          // label: classes.label,
          // root: classes.wrap,
        }}
        control={
          <Checkbox
            classes={{
              // checked: classes.checked,
              // root: classes.root,
            }}
            size='small'
            checked={checked}
            onChange={() => changeChecked(id)}
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
