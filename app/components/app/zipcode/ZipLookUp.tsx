'use client';
import { useEffect, useState } from 'react';
import './ZipLookUp.css';
import InputUnregistered from '../inputs/InputUnregistered';


interface AlertProps { 
    onChange:(value:any) => void;
    value:string;
    error?:boolean;
  }
  const ZipLookUp: React.FC<AlertProps> = ({
    value,
    error,
    onChange
  })=>{

    const [zip, setZip] = useState(value);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [allZipCodes, setAllZipCodes] = useState([{state_name:'',city:'',zip:''}]);
    const [lookupHappened, setLookupHappened] = useState(false);

    useEffect(() => {
        fetch('./zipCodesUSA.json')
            .then(response => response.json())
            .then(result => {
                const zipCodes = result.map((item:any) => {
                    return item;
                });
                setAllZipCodes(zipCodes);
            });
    }, []);

    const handleZipChange = (a:string) => {
        let val = a.replace(/[^\d]/, '');
        if (val.length < 6) {
            setZip(val);
            
        }
        if (val.length < 5 && lookupHappened) {
            setState('');
            setCity('');
            onChange({state_name:'',city:'',zip:''});
            setLookupHappened(false);
        }
        if (val.length === 5) {
            const entry = allZipCodes.filter(item => {
                return item['zip'].toLowerCase().includes(val.toLowerCase())
            });
            if (entry.length === 0) {
                setState('No entry found');
                setCity('No entry found');
                onChange({state_name:'No entry found',city:'No entry found',zip:''});
                setLookupHappened(true);
                setTimeout(() => { // clear the fields in 2 seconds after showing 'No entry found'
                    setState('');
                    setCity('');
                    onChange({state_name:'',city:'',zip:''});
                }, 2000);
            } else if (entry.length >= 1) {
                setState(entry[0]['state_name']);
                setCity(entry[0]['city']);
                setLookupHappened(true);
                onChange(entry[0]);
            } 
            // else {
            //     setState('More than one match');
            //     setCity('More than one match');
            //     setLookupHappened(true);
            // }
        }
    };

    return (
        <InputUnregistered
            label="Zip Code"
            //infoMessage="What's the vehicle's location?"
            required
            error={error}
            value={zip}
            onChange={(e)=>{handleZipChange(e.target.value)}}
          />
        // <div className="zip-box">
        //     <ol>
        //         <li>Zip length limit = 5 digits</li>
        //         <li>Only digits are allowed for entering</li>
        //         <li>If the Zip changes after lookup - clear the state and city fields</li>
        //     </ol>
        //     <input type="text" placeholder="Zip" value={zip} onChange={(e) => handleZipChange(e.target.value)} />
        //     <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        //     <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        // </div>
    );
}

export default ZipLookUp;
