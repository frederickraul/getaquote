'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from 'react-select';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export type StateSelectValue ={
  flag: string;
  label: string;
  latlng: number[];
  value: string;
}

interface StateSelectProps{
  id: string;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  required?: boolean,
  countryCode: string;
  value?: StateSelectValue;
  label?:string;
  isClearable?:boolean;
  onChange: (value: StateSelectValue) => void;

}

const StateSelect:React.FC<StateSelectProps> = ({
  id,
  register,
  errors,
  required,
  isClearable,
  countryCode,
  value,
  label,
  onChange
}) => {
 
  const {getStatesOfCountry} = useCountries();
  return ( 
    <div>
      <div className="font-light text-neutral-500 mt-0 mb-1">
        {value && label}
      </div>
      <Select
        id={id}
        {...register(id,{required})}
        placeholder="State"
        isClearable={isClearable}
        options={getStatesOfCountry(countryCode)}
        value={value}
        onChange={(value) => onChange(value as StateSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-800 ml-1">
                {option.region}
              </span>
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

export default StateSelect