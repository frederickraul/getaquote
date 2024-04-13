'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from 'react-select';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type CountrySelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps{
    id: string;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    required?: boolean,
    value?: CountrySelectValue;
    label?:string,
    isClearable?:boolean;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
  id,
  register,
  errors,
  required,
  value,
  label,
  isClearable,
  onChange
}) => {
  const {getAll,getByValue, getStatesOfCountry} = useCountries();
  return ( 
    <div>
      <div className="font-light text-neutral-500 mt-0 mb-1">
        {value && label}
      </div>
      
      <Select
        id={id}
        instanceId={id}
        {...register(id,{required})}
        placeholder="Anywhere"
        isClearable={isClearable}
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option?.value}</div>
            <div>
              {option.label}
            </div>

          </div>
        )}
        classNames={{
          control: ()=> 'p-1 2xl:p-3 border-2',
          input: ()=> '2xl:text-lg',
          option: ()=> '2xl:text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors:{
            ...theme.colors,
            primary: 'black',
            primary25: '#e4ffe6'
          }
        })}
        
      />
    </div>
    
  )
}

export default CountrySelect