'use client';

import useCountries from "@/app/hooks/useCountries";
import Select,{ createFilter} from "react-select";
import WindowedSelect from "react-windowed-select";



export type CitySelectValue ={
  stateCode: String;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CitySelectProps{
    label?: string;
    stateCode?: string;
    countryCode: string;
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
    isClearable?:boolean;
}

const CitySelect:React.FC<CitySelectProps> = ({
  label,
  countryCode,
  stateCode,
  value,
  isClearable,
  onChange
}) => {
  // console.log("City Select");
  // console.log(value);
  // console.log('->>>>>>>>>>>>');
  
  const {getCitiesOfState, getCitiesOfCountry} = useCountries();

  const cities = stateCode? getCitiesOfState(countryCode, stateCode): getCitiesOfCountry(countryCode) || [];

  return ( 
    <div className="w-full relative">
      <div className="font-light text-neutral-500 mt-0 mb-1">
        {value && label}
      </div>
    <WindowedSelect 
      windowThreshold={20}
      placeholder="City"
      isClearable={isClearable}
      options={cities}
      value={value}
      onChange={(value) => onChange(value as CitySelectValue)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
            <div>{option.stateCode}</div>
            <div>
              {option.label}
            </div>

          </div>
        )}
        classNames={{
          control: ()=> 'p-1 2xl:p-3 border-2',
          input: ()=> '2xl:text-lg hover:none',
          option: ()=> '2xl:text-lg hover:none',
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

export default CitySelect