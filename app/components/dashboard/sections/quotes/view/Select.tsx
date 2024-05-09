import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import React from 'react'

interface FieldProps {
    label: string;
    value: any;
    options: any;
    price?: boolean;
    onChange: (value:string) => void;
  }
  
  const Select: React.FC<FieldProps> = ({
    label,
    value,
    options,
    price,
    onChange,
  }) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="outlined-adornment-amount"
            select
            label={label}
            value={value}
            onChange={(e)=>{onChange(e.target.value)}}
          >
            {options.map((option:any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

            </TextField>
        </FormControl>
  )
}

export default Select;