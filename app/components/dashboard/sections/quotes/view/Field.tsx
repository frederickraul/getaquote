import {  FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react'

interface FieldProps {
    label: string;
    value: any;
    required?:boolean;
    price?: boolean;
    onChange: (value:string) => void;
  }
  
  const Field: React.FC<FieldProps> = ({
    label,
    value,
    price,
    required,
    onChange,
  }) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">
            {label} 
           {required ?
            <span className='text-red-500'></span>
            :
            <span className='text-neutral-500'> (optional)</span>
          }
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={price && <InputAdornment position="start">$</InputAdornment>}
            label={`${label}   (optional)`}
            value={value}
            onChange={(e)=>{onChange(e.target.value)}}
          />
        </FormControl>
  )
}

export default Field;