import InputUnregistered from '@/app/components/inputs/InputUnregistered';
import { FormControl, TextField } from '@mui/material';
import React from 'react'

interface FieldProps {
    label: string;
    value: any;
  }
  
  const Field: React.FC<FieldProps> = ({
    label,
    value,
  }) => {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
    <TextField
          label={label}
          value={value}
          className='w-full'
          onChange={()=>{}}
          
        />
   
  </FormControl>
  )
}

export default Field;