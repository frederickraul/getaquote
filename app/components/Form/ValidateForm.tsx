'use client'

const validateForm = (step:number, STEPS:any, data:any, errors:any, setErrors:any) =>{
    let isError = 0;
    console.log(data);
  
    if(step === STEPS.DESCRIPTION){
      let vinError = false;
      let yearError = false;
      let makeError = false;
      let modelError = false;
      let engineError = false;

        if(data.vin === ''){
          vinError = true;
          isError++;
        }
        if(data.year.value === ''){
         yearError = true;
          isError++;
        }
        if(data.make.value === ''){
          makeError = true;
          isError++;
        }
        if(data.model.value === ''){
          modelError = true;
          isError++;
        }
        if(data.engine === ''){
          engineError = true;
          isError++;
        }
        setErrors({ ...errors, ['vin']: vinError, ['year']: yearError, ['make']: makeError, ['model']: modelError,['engine']: engineError})
    } 

    if(step === STEPS.PAIDOFF){
      let paidOffError = false;
      if(data.paidOff.value === ''){
        paidOffError = true;
        isError++;
      }
      setErrors({ ...errors, ['paidOff']: paidOffError})
    }

    if(step === STEPS.VEHICLECONDITION){
      let mileageError = false;
      let vehicleConditionError = false;
      let wheelsError = false;
      let allWheelsError = false;

      if(data.mileage === ""){
        mileageError = true;
        isError++;
      }

      if(data.vehicleCondition.value === ''){
        vehicleConditionError = true;
        isError++;
      }

      if(data.wheels.value === ''){
        wheelsError = true;
        isError++;
      }
      if(data.allWheels.value === ''){
        allWheelsError = true;
        isError++;
      }


      setErrors({ ...errors, ['mileage']: mileageError,['vehicleCondition']: vehicleConditionError,['wheels']: wheelsError,['allWheels']: allWheelsError})
    }

    if(step === STEPS.BODYDAMAGE){
      let bodyDamage = false;
     
      if(data.bodyDamage.value === ""){
        bodyDamage = true;
        isError++;
      }
      setErrors({ ...errors, ['bodyDamage']: bodyDamage,})
    }

    if(step === STEPS.OWNERSHIP){
      let ownership = false;
     
      if(data.ownershipDocument.value === ""){
        ownership = true;
        isError++;
      }
      setErrors({ ...errors, ['ownershipDocument']: ownership,})
    }

    if(step === STEPS.OPERATION){
      let partMissing = false;
     
      if(data.partMissing.value === ""){
        partMissing = true;
        isError++;
      }
      setErrors({ ...errors, ['partMissing']: partMissing,})
    }

    if(step === STEPS.BATTERY){
      let battery = false;
      let catalytic = false;
     
      if(data.battery.value === ""){
        battery = true;
        isError++;
      }
      if(data.catalytic.value === ""){
        catalytic = true;
        isError++;
      }
      setErrors({ ...errors, ['battery']: battery,['catalytic']: catalytic})
    }

    if(step === STEPS.ZIPCODE){
      let zip = false;
      let city = false;
      let state = false;
     
      if(data.zip === ""){
        zip = true;
        isError++;
      }
      if(data.city === ""){
        city = true;
        isError++;
      }
      if(data.state === ""){
        state = true;
        isError++;
      }
      setErrors({ ...errors, ['zip']: zip, ['city']: city, ['state']: state})
    }


    if(step === STEPS.PHONE){
      let phone = false;
      let phone2 = false;
      let name = false;
      if(data.phone === ''){
        phone = true;
        isError++;
      }
      if(data.phone2 === ''){
        phone2 = true;
        isError++;
      }
      if(data.name === ''){
        name = true;
        isError++;
      }
      setErrors({ ...errors, ['phone']: phone, ['phone2']: phone2,['name']: name})
    }

    return isError;
}

export default validateForm