import {  FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react'

interface FieldProps {
    label: string;
    value: any;
    price?: boolean;
    onChange: (value:string) => void;
  }
  
  const Field: React.FC<FieldProps> = ({
    label,
    value,
    price,
    onChange,
  }) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={price && <InputAdornment position="start">$</InputAdornment>}
            label={label}
            value={value}
            onChange={(e)=>{onChange(e.target.value)}}
          />
        </FormControl>
  )
}

export default Field;