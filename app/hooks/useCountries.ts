import { State, Country, City } from 'country-state-city';

const formatedCountries = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
  flag: country.flag,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const formatedStates = State.getStatesOfCountry('US').map((country) => ({
  value: country.isoCode,
  label: country.name,
  flag: country.countryCode,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const formatedCities = City.getCitiesOfState('US','CA').map((country) => ({
  value: country.countryCode,
  label: country.name,
  flag: country.countryCode,
  latlng: [country.latitude,country.longitude],
  //region: country.region
}));

const useCountries = () => {
  const getAll = () => formatedCountries;

  const getStatesOfCountry = (country: string) => {
      return State.getStatesOfCountry(country).map((country) => ({
        value: country.isoCode,
        label: country.name,
        flag: country.countryCode,
        latlng: [country.latitude,country.longitude],
        //region: country.region
      }));
  };

  const getCitiesOfCountry = (country: string) => {
      return City.getCitiesOfCountry(country)?.map((city) => ({
        value: city.stateCode+city.name,
        label: city.name,
        stateCode: city.stateCode,
        latlng: [city.latitude,city.longitude],
        //region: country.region
      }));
  };

  const getCitiesOfState = (country: string, state: string) => {
      return City.getCitiesOfState(country, state).map((city) => ({
        value: city.countryCode,
        label: city.name,
        stateCode: city.stateCode,
        latlng: [city.latitude,city.longitude],
        //region: country.region
      }));
  };

  const getByValue = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  }

  const getStateByValue = (countryCode: string, stateCode: string) => {
    const formatedStates = State.getStatesOfCountry(countryCode).map((country) => ({
      value: country.isoCode,
      label: country.name,
      flag: country.countryCode,
      latlng: [country.latitude,country.longitude],
      //region: country.region
    }));

    return formatedStates.find((item) => item.value === stateCode);
  }

  const getCityByValue = (countryCode: string, stateCode: string, cityName: string) => {
    const formatedCities = City.getCitiesOfState(countryCode, stateCode).map((city) => ({
      value: city.countryCode,
      label: city.name,
      stateCode: city.stateCode,
      latlng: [city.latitude,city.longitude],
      //region: country.region
    }));
    
    return formatedCities.find((item) => item.label === cityName);
  }
  
  return{
    getAll,
    getByValue,
    getStatesOfCountry,
    getCitiesOfCountry,
    getCitiesOfState,
    getStateByValue,
    getCityByValue,
  }
}

export default useCountries;