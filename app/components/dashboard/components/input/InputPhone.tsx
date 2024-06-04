import { useState } from "react";
import Field from "./Field";

interface InputProps{
  label?:string;
  error?:boolean;
  infoMessage?:string;
  value:any;
  required?:boolean;
  onChange:(value:any,value2?:any)=>void;
}

const InputPhone: React.FC<InputProps> = ({
  label,
  infoMessage,
  required,
  error,
  value,
  onChange,
}) => {

  
  const normalizeInput = (value:any, previousValue:any) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    console.log(cvLength);
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
    return value;
  };
  
  const validateInput = (value:any) => {
    let error = ""
    
    if (!value) error = "Required!"
    else if (value.length !== 14) error = "Invalid phone format. ex: (555) 555-5555";
    
    return error;
  };

  const handleChange =(e:any)=>{
    
    const formattedNumber = normalizeInput(e, value);

    onChange(formattedNumber,e);
    
  }


    return(
      <>
      <Field
        label={label ? label : "Phone"}
        required={required}
        value={value}
        onChange={(e)=>{handleChange(e)}}
      />
       
        </>
  )
}

export default InputPhone