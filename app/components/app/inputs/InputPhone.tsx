import { useState } from "react";
import InputUnregistered from "./InputUnregistered";

interface InputProps{
  label?:string;
  error?:boolean;
  infoMessage?:string;
  value:any;
  onChange:(value:any)=>void;
}

const InputPhone: React.FC<InputProps> = ({
  label,
  infoMessage,
  error,
  value,
  onChange,
}) => {
  const [phone, setphone] = useState("");


  const normalizeInput = (value:any, previousValue:any) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  
  const validateInput = (value:any) => {
    let error = ""
    
    if (!value) error = "Required!"
    else if (value.length !== 14) error = "Invalid phone format. ex: (555) 555-5555";
    
    return error;
  };

  const handleChange =(e:any)=>{
    const number = e.target.value;
    const formattedNumber = normalizeInput(number, value);
    onChange(formattedNumber);
    
  }


    return(
      <>
      <InputUnregistered
        label={label ? label : "Phone"}
        infoMessage={infoMessage ? infoMessage : ""}
        required
        value={value}
        error={error}
        onChange={(e)=>{handleChange(e)}}
      />
       
        </>
  )
}

export default InputPhone